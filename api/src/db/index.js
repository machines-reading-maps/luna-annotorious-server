import r from 'rethinkdb';

import { DB_CONFIG } from '../Config.js';
import { deleteById, findBySource, upsertAnnotation } from './Annotation.js';

export const exists = () =>
  r.connect(DB_CONFIG)
    .then(conn => r.dbList().run(conn))
    .then(databases => databases.includes(DB_CONFIG.db));

export const initDB = () =>
  r.connect(DB_CONFIG).then(conn =>
    r.dbCreate(DB_CONFIG.db)
      .do(() => r.tableCreate('annotation'))
      .do(() => r.tableCreate('lock'))
      .run(conn));

export default {
  // Lifecycle
  exists,
  initDB,

  // Annotation CRUD
  deleteById,
  findBySource,
  upsertAnnotation,
}
