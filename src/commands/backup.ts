import { ux } from "@oclif/core";

import { ClarangoCommand, Flags } from "../base-command.js"
import { backup } from "../util/backup.js";

export class Backup extends ClarangoCommand<typeof Backup> {
  static summary = 'backup the contents of a database'

  public async run(): Promise<Flags<typeof Backup>> {
    const conn = this.buildConnection();
    const db = this.getDatabase(conn);
    const exists = await db.exists();

    if (!exists) {
      this.error(`No database named ${db.name} exists.`);
    }

    ux.action.start('Backing up');
    backup.status.on('collection', ({ name }) => { ux.action.status = name });
    backup.status.on('end', () => ux.action.stop('complete!'));
    await backup(db, { excludeEmpty: true, url: conn.url?.toString() });

    return this.flags;
  }
}
