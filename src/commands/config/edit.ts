import { editor } from '@inquirer/prompts';
import jetpack from 'fs-jetpack';

import { ClarangoCommand, Flags } from "../../base-command.js"
import { ClarangoConfigSchema } from '../../config.js';

export class Edit extends ClarangoCommand<typeof Edit> {
  static summary = 'edit config file manually'

  public async run(): Promise<Flags<typeof Edit>> {
    const path = jetpack.dir(this.config.configDir).path('config.json');
    const data = jetpack.read(path);

    const newConfig = await editor({
      default: data,
      message: 'Edit raw configuration data',
      postfix: '.json',
      validate(input) {
        try {
          const parsed = ClarangoConfigSchema.safeParse(JSON.parse(input));
          return parsed.success ? true : parsed.error.message;
        } catch {
          return 'Invalid JSON data';
        }
      }
    });

    const parsed = ClarangoConfigSchema.safeParse(JSON.parse(newConfig));
    if (parsed.success) {
      this.userConfig = parsed.data;
      this.saveConfig();
      this.log('Configuration changes saved!');
    }

    return this.flags;
  }
}
