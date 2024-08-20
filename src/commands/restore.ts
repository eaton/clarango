import { ClarangoCommand, Flags } from "../base-command.js"
import { restore } from "../util/restore.js";

export class Restore extends ClarangoCommand<typeof Restore> {
  static summary = 'backup the contents of a database'

  public async run(): Promise<Flags<typeof Restore>> {
    const conn = this.buildConnection();
    const db = this.getDatabase(conn);
    const exists = await db.exists();

    if (!exists) {
      this.error(`No database named ${db.name} exists.`);
    }

    const data = await restore(db);

    // Nothin' happening here yet
    this.logJson(data);

    return this.flags;
  }
}
