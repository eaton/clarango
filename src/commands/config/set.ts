import { ClarangoCommand, Flags } from "../../base-command.js"

export class Set extends ClarangoCommand<typeof Set> {
  static summary = 'add settings for a server'

  public async run(): Promise<Flags<typeof Set>> {
    this.userConfig.servers ??= {};
    this.userConfig.servers[this.flags.server] = {};

    if (this.flags.databaseName) this.userConfig.servers[this.flags.server].databaseName = this.flags.databaseName;
    if (this.flags.host) this.userConfig.servers[this.flags.server].url = this.flags.host;

    const auth = this.userConfig.servers[this.flags.server].auth ?? {};
    if (this.flags.username) auth.username = this.flags.username;
    if (this.flags.password) auth.password = this.flags.password;
    if ('username' in auth || 'password' in auth) {
      this.userConfig.servers[this.flags.server].auth = auth;
    }

    this.saveConfig();

    this.log(`Saved settings for server '${this.flags.server}'`);
    return this.flags;
  }
}
