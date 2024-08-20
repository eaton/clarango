import { isEmpty } from 'obby';
import { z } from 'zod';

export const ClarangoSavedServerSchema = z.object({
  auth: z.object({
    password: z.string().optional(),
    username: z.string().optional(),
  }).optional().transform(a => isEmpty(a) ? undefined : a),
  databaseName: z.string().optional(),
  url: z.string().optional()
});

export const ClarangoConfigSchema = z.object({
  servers: z.record(ClarangoSavedServerSchema)
    .optional()
    .transform(c => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      if (isEmpty(c)) return undefined;
      return Object.fromEntries(Object.entries(c ?? {}).filter(e => !isEmpty(e[1])))
    })
});

const ClarangoCollectionInfoSchema = z.object({
  bytes: z.coerce.number().optional(),
  count: z.coerce.number().optional(),
  edge: z.coerce.boolean().optional(),
  name: z.string(),
  system: z.coerce.boolean().default(false),
});

export const ClarangoBackupSchema = z.object({
  collections: z.array(ClarangoCollectionInfoSchema).transform(c => c.filter(e => !isEmpty(e))),
  databaseName: z.string().optional(),
  date: z.coerce.date().optional(),
  url: z.string().optional()
});

export type ClarangoConfig = z.infer<typeof ClarangoConfigSchema>;
export type ClarangoSavedServer = z.infer<typeof ClarangoSavedServerSchema>;
export type ClarangoBackup = z.infer<typeof ClarangoBackupSchema>;
export type ClarangoCollectionInfo = z.infer<typeof ClarangoCollectionInfoSchema>;
