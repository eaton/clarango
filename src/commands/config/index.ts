import { ClarangoCommand, Flags } from "../../base-command.js"

export class Config extends ClarangoCommand<typeof Config> {
  static summary = 'display and manage CLI settings'

  public async run(): Promise<Flags<typeof Config>> {
    this.logJson(this.userConfig);
    return this.flags;
  }
}
