import r from 'rethinkdb';

import { DB_CONFIG } from '../Config';
import { deleteById, findBySource, upsertAnnotation } from './Annotation';

const exists = () =>
  r.connect(DB_CONFIG)
    .then(conn => r.dbList().run(conn))
    .then(databases => databases.includes(DB_CONFIG.db));

const initDB = () =>
  r.connect(DB_CONFIG).then(conn =>
    r.dbCreate(DB_CONFIG.db)
      .do(() => r.tableCreate('annotation'))
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