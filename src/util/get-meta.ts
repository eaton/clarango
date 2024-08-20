import { Database } from "arangojs";
import { CollectionType } from "arangojs/collection";

import { ClarangoBackup } from "../config.js";

export async function getMeta(db: Database) {
  const meta: ClarangoBackup = {
    collections: [],
    databaseName: db.name,
    date: new Date(Date.now()),
  }

  for (const c of await db.listCollections()) {
    // eslint-disable-next-line no-await-in-loop
    const figures = await db.collection(c.name).figures(true);

    meta.collections.push({
      count: figures.count ?? 0,
      edge: c.type === CollectionType.EDGE_COLLECTION,
      name: c.name,
      system: c.isSystem,
    });
  }

  return meta;
}