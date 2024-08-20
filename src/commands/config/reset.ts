import { ClarangoCommand, Flags } from "../../base-command.js"

export class Reset extends ClarangoCommand<typeof Reset> {
  static summary = 'discard all saved server settings'

  public async run(): Promise<Flags<typeof Reset>> {
    this.userConfig = {};
    this.saveConfig();

    this.log('Configuration reset.')

    return this.flags;
  }
}
