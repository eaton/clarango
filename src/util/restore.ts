import { Database, aql } from "arangojs";
import Emittery from 'emittery';
import jetpack from 'fs-jetpack';
import { z } from 'zod';

import { ClarangoBackup, ClarangoCollectionInfo, ClarangoBackupSchema } from "../config.js";

const InsertableRecordSchema = z.object({
  _id: z.string(),
  _key: z.string()
}).passthrough();

export type RestoreOptions = {
  createCollections?: boolean,
  createDatabase?: boolean,
  databaseName?: string,
  path?: string,
  truncateCollections?: boolean,
}

const defaults: RestoreOptions = {
  createCollections: true,
  createDatabase: true,
};

export const restore = async (db: Database, options: RestoreOptions = {}) => {
  const opt = { ...defaults, ...options };

  // Get the backup meta file
  const backup = loadBackupFile(opt.path);
  restore.status.emit('start', backup);

  return backup;

  // If no target database was specified, use the default.
  const name = opt.databaseName ?? backup.databaseName ?? db.name;
  let targetDb = db.database(name);

  // If the database doesn't exist, create it or throw an error.
  const exists = await targetDb.exists();
  if (!exists) {
    if (opt.createDatabase) {
      targetDb = await db.createDatabase(name);
    }

    throw new Error('Target database does not exist');
  }
}

restore.status = new Emittery<{
  collection: { name: string, total: number },
  document: { index: number, total: number },
  end: undefined,
  error: { error?: Error, name: string },
  start: ClarangoBackup,
}>();

function loadBackupFile(path: string = '.') {
  if (jetpack.exists(path) === 'dir') {
    // We've been given a directory; look for a backup file.
    const backupFiles = jetpack.dir(path).find({ matching: '*-*-backup.json' });
    const backupFile = backupFiles.shift();
    if (backupFile) {
      const data = jetpack.dir(path).read(backupFile, 'json')
      const parsed = ClarangoBackupSchema.safeParse(data);
      if (parsed.success) {
        return parsed.data;
      }

      throw new Error('Error parsing backup file');
    }
  }
  
  if (jetpack.exists(path) === 'file' && path.endsWith('.json')) {
    const data = jetpack.dir(path).read(path, 'json')
    const parsed = ClarangoBackupSchema.safeParse(data);
    if (parsed.success) {
      return parsed.data;
    }
          
    throw new Error('Error parsing backup file');
  }

  throw new Error('Backup file not found');
}
