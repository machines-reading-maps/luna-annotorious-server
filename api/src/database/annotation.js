import r from 'rethinkdb';

import { DB_CONFIG } from '../config';

const conn = () => 
  r.connect(DB_CONFIG).then(conn => ({ conn, table: r.table('annotation') }));

export const upsertAnnotation = annotation =>
  conn()
    .then(({ conn, table }) => table
      .insert(annotation, { conflict: 'replace' })
      .run(conn));

export const deleteById = annotationId =>
  conn()
    .then(({ conn, table }) => table
      .get(annotationId)
      .delete()
      .run(conn));

export const findBySource = source =>
  conn()
    .then(({ conn, table }) => table
      .filter({ target: { source }})
      .run(conn))
    .then(cursor => cursor.toArray());

export const findBySourceForUser = (source, user) =>
  conn()
    .then(({ conn, table}) => table
      .filter(annotation =>
        annotation('target')('source').eq(source)
          .and(
            annotation('body').contains(body => body('creator')('id').eq(user))))
      .run(conn))
    .then(cursor => cursor.toArray());
