import { Database, aql } from "arangojs";
import Emittery from 'emittery';
import jetpack from 'fs-jetpack';

import { ClarangoBackup } from "../config.js";
import { getMeta } from "./get-meta.js";

export type BackupOptions = {
  excludeEmpty?: boolean,
  excludeSystem?: boolean,
  path?: string,
  url?: string,
}

const defaults: BackupOptions = {
  excludeSystem: true,
};

export const backup = async (db: Database, options: BackupOptions = {}) => {
  const opt = { ...defaults, options };
  const meta = await getMeta(db);
  if (opt.url) meta.url ??= opt.url;
  
  backup.status.emit('start', meta);

  const dir = jetpack.dir(opt.path ?? db.name);
  dir.write(`${db.name}-${Date.now()}-backup.json`, meta, { jsonIndent: 2 });

  for (const collection of meta.collections) {
    if (opt.excludeSystem && collection.system) continue;
    if (opt.excludeEmpty && collection.count === 0) continue;
    backup.status.emit('collection', { name: collection.name, total: collection.count ?? 0 });
    const file = dir.dir(collection.edge ? 'edges' : 'documents').createWriteStream(`${collection.name}.ndjson`, { autoClose: true });

    let progress = 0;
    // eslint-disable-next-line no-await-in-loop
    const cursor = await db.query<Record<string, unknown>>(aql`FOR d in ${db.collection(collection.name)} RETURN d`, { count: true });
    if (cursor.count) {
      while (cursor.hasNext) {
        // eslint-disable-next-line no-await-in-loop
        file.write(JSON.stringify(await cursor.next(), undefined, 0) + '\n');
        backup.status.emit('document', { index: progress++, total: cursor.count });
      }
    }
  }

  backup.status.emit('end');
  return meta;
}

backup.status = new Emittery<{
  collection: { name: string, total: number },
  document: { index: number, total: number },
  end: undefined
  error: { error?: Error, name: string },
  start: ClarangoBackup,
}>();