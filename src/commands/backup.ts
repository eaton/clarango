import chalk from 'chalk';
import { MultiBar, Presets } from 'cli-progress';

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

    this.log(chalk.bold(`Backing up ${db.name}…`));

    const bars = new MultiBar({}, Presets.shades_classic);
    const dProgress = bars.create(0, 0);
    const cProgress = bars.create(0, 0);
    backup.status.on('start', ({ collections }) => dProgress.setTotal(collections.length));
    backup.status.on('collection', ({ total }) => {
      dProgress.increment();
      cProgress.update(0);
      cProgress.setTotal(total);
    });
    backup.status.on('document', () => cProgress.increment());
    backup.status.on('end', () => bars.stop());

    await backup(db, { excludeEmpty: true, url: conn.url?.toString() });

    this.log(chalk.bold(`Backup complete!`));

    return this.flags;
  }
}
