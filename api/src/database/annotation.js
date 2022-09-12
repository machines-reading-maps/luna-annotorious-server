import r from 'rethinkdb';

import { DB_CONFIG } from '../config';

const conn = () => 
  r.connect(DB_CONFIG).then(conn => ({ conn, table: r.table('annotation') }));


/** Internal CRUD helpers **/
const deleteAnnotation = pid =>
  conn()
    .then(({ conn, table }) => table
      .get(pid)
      .delete()
      .run(conn));

const insertAnnotation = annotation =>
  conn()
    .then(({ conn, table }) => table
      .insert(annotation, { conflict: 'replace' })
      .run(conn));


/** API **/
export const upsertAnnotation = (annotation, user) =>
  findByIdAndUser(annotation.id, user).then(existing => {
    if (existing.length > 1) {
      // Means that our hand-rolled uniqueness constraint has been overridden
      console.warn(`Too many annotations for ${user}, ${annotation}`);
    }

    // Delete existing
    if (existing.length > 0) {
      // One or more existing: delete, then insert
      return Promise.all(existing.map(annotation => deleteAnnotation(annotation.pid)))
        .then(() => insertAnnotation(annotation));
    } else {
      // No existing - insert
      return insertAnnotation(annotation);
    }
  });

export const findByIdAndUser = (id, user) =>
  conn()
    .then(({ conn, table}) => table
      .filter(annotation =>
        annotation('id').eq(id)
          .and(
            annotation('body').contains(body => body('creator')('id').eq(user))))
      .run(conn))
    .then(cursor => cursor.toArray());

export const findBySourceAndUser = (source, user) =>
  conn()
    .then(({ conn, table}) => table
      .filter(annotation =>
        annotation('target')('source').eq(source)
          .and(
            annotation('body').contains(body => body('creator')('id').eq(user))))
      .run(conn))
    .then(cursor => cursor.toArray());

export const deleteByIdAndUser = (id, user) =>
  conn()
    .then(({ conn, table}) => table
      .filter(annotation =>
        annotation('id').eq(id)
          .and(
            annotation('body').contains(body => body('creator')('id').eq(user))))
      .delete()
      .run(conn));