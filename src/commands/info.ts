import { ClarangoCommand, Flags } from "../base-command.js"

export class Info extends ClarangoCommand<typeof Info> {
  static summary = 'display database collections and metadata'

  public async run(): Promise<Flags<typeof Info>> {
    const conn = this.buildConnection();
    const db = this.getDatabase(conn);
    const exists = await db.exists();

    if (!exists) {
      this.error(`No database named ${db.name} exists.`);
    }

    const info = await db.get();

    if (info.isSystem) {
      this.log(`Available databases:`);
      for (const d of await db.databases()) {
        this.log(`- ${d.name}`);
      }
    } else {
      const collections = await db.listCollections(true);
      this.log(`Database: ${conn.databaseName}`);
      this.log(`URL: ${conn.url}`);
      this.log(`Collections:`);
      for (const c of collections) {
        this.log(`- ${c.name}`);
      }
    }

    return this.flags;
  }
}
