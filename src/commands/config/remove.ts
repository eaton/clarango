import { ClarangoCommand, Flags } from "../../base-command.js"

export class Remove extends ClarangoCommand<typeof Remove> {
  static summary = 'remove settings for a server'

  public async run(): Promise<Flags<typeof Remove>> {
    if (!this.flags.server) {
      this.error(`No server config specified.`);
    }

    if (this.userConfig.servers?.[this.flags.server]) {
      delete this.userConfig.servers[this.flags.server];
      this.saveConfig();
    }

    this.log(`Removed server settings for server '${this.flags.server}'`);
    return this.flags;
  }
}
