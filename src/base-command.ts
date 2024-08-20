import { Command, Flags, Interfaces } from '@oclif/core'
import { Database } from 'arangojs';
import { Config } from 'arangojs/connection';
import { emptyDeep } from 'empty-deep';
import jetpack from 'fs-jetpack';
import { merge } from 'obby';

import { ClarangoConfig, ClarangoConfigSchema } from './config.js';

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<T['flags'] & typeof ClarangoCommand['baseFlags']>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class ClarangoCommand<T extends typeof Command> extends Command {
  // define flags that can be inherited by any command that extends BaseCommand
  static baseFlags = {
    'databaseName': Flags.string({
      aliases: ['db'],
      char: 'd',
      helpGroup: 'CONNECTION',
      summary: 'Database name'
    }),
    'host': Flags.string({
      aliases: ['url'],
      char: 'h',
      helpGroup: 'CONNECTION',
      summary: 'Server URL (with port)'
    }),
    'password': Flags.string({
      aliases: ['pass'],
      char: 'p',
      helpGroup: 'CONNECTION',
      summary: 'Server password'
    }),
    'server': Flags.string({
      char: 's',
      default: 'default',
      helpGroup: 'CONNECTION',
      summary: 'Saved server preset',
    }),
    'username': Flags.string({
      aliases: ['user'],
      char: 'u',
      helpGroup: 'CONNECTION',
      summary: 'Server username'
    })
  }

  static enableJsonFlag = true
  protected args!: Args<T>
  protected flags!: Flags<T>
  protected userConfig!: ClarangoConfig
  
  public buildConnection(config: Flags<typeof ClarangoCommand> = this.flags) {
    const defaultConfig: Partial<Config> = config.server ? emptyDeep(this.userConfig.servers?.default) ?? {} : {};
    const serverConfig: Partial<Config> = config.server ? emptyDeep(this.userConfig.servers?.[config.server]) ?? {} : {};
    const newConfig: Partial<Config> = merge(defaultConfig, serverConfig);

    if (config.username) {
      newConfig.auth = {
        username: config.username,
      }
    }

    if (config.databaseName) newConfig.databaseName = config.databaseName;
    if (config.password && newConfig.auth && 'username' in newConfig.auth) {
      newConfig.auth.password = config.password;
    }

    return newConfig;
  }

  public getDatabase(config?: Partial<Config>) {
    const db = new Database(config);

    if (config?.databaseName) {
      return db.database(config.databaseName);
    }

    return db;
  }

  public async init(): Promise<void> {
    await super.init();
    const { args, flags } = await this.parse({
      args: this.ctor.args,
      baseFlags: (super.ctor as typeof ClarangoCommand).baseFlags,
      enableJsonFlag: this.ctor.enableJsonFlag,
      flags: this.ctor.flags,
      strict: this.ctor.strict,
    });

    this.flags = flags as Flags<T>;
    this.args = args as Args<T>;

    this.userConfig = this.loadConfig();
  }

  protected loadConfig() {
    const rawConfig = jetpack.dir(this.config.configDir).read('config.json', 'json') ?? {};
    const parsed = ClarangoConfigSchema.safeParse(rawConfig);
    if (parsed.success) {
      return parsed.data;
    }

    this.logJson(parsed.error);
    return {};
  }

  protected saveConfig() {
    jetpack.dir(this.config.configDir).write('config.json', this.userConfig);
  }
}
