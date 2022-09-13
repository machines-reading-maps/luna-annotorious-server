import r from 'rethinkdb';

import { DB_CONFIG } from '../config';
import { deleteByIdAndUser, findBySourceAndUser, upsertAnnotation, listRecent } from './annotation';

const exists = () =>
  r.connect(DB_CONFIG)
    .then(conn => r.dbList().run(conn))
    .then(databases => databases.includes(DB_CONFIG.db));

const initDB = () =>
  r.connect(DB_CONFIG).then(conn =>
    r.dbCreate(DB_CONFIG.db)
      .do(() => r.tableCreate('annotation', { primaryKey: 'key' }))
      .run(conn));

export default {
  // Lifecycle
  exists,
  initDB,

  // Annotation CRUD
  deleteByIdAndUser,
  findBySourceAndUser,
  upsertAnnotation,

  // Admin methods
  listRecent
}
