import r from 'rethinkdb';

import { DB_CONFIG } from '../config';

const conn = () => 
  r.connect(DB_CONFIG).then(conn => ({ conn, table: r.table('annotation') }));

// Helper to strip the 'key' and 'lastUpdated' fields, which are for internal
// use only
const removeInternalFields = record => {
  const { key, lastUpdated, ...annotation } = record;
  return annotation;
}


/**
 * INSERTS AN ANNOTATION INTO THE DB. Uniqueness is enforced on 
 * the combination of annotation ID + user ID. Which means that
 * there can be multiple annotations with the same ID in the database!
 * But only one for any given user. 
 * 
 * In case an annotation with the given ID + user ID already exists,
 * the previous version is replaced.
 */
export const upsertAnnotation = (annotation, userId) => {
  // Database creates a 'compound key' (annotation ID + user ID)
  // for uniqueness, plus records last update timestamp
  const record = {
    key: `${annotation.id}.${userId}`,
    lastUpdated: new Date(), 
    ...annotation
  }

  return conn()
    .then(({ conn, table }) => table
      .insert(record, { conflict: 'replace' })
      .run(conn));
}


/**
 * RETRIEVES AN ANNOTATION BY ANNOTATION ID AND USER ID.
 */
export const findByIdAndUser = (id, userId) =>
  conn()
    .then(({ conn, table}) => table
      .filter(annotation =>
        annotation('id').eq(id)
          .and(
            annotation('body').contains(body => body('creator')('id').eq(userId))))
      .run(conn))
    .then(cursor => cursor.toArray().map(removeInternalFields));


/**
 * LISTS ANNOTATIONS FOR A GIVEN SOURCE URL AND USER ID.
 */
export const findBySourceAndUser = (source, userId) =>
  conn()
    .then(({ conn, table}) => table
      .filter(annotation =>
        annotation('target')('source').eq(source)
          .and(
            annotation('body').contains(body => body('creator')('id').eq(userId))))
      .run(conn))
    .then(cursor => cursor.toArray().map(removeInternalFields));


/**
 * DELETES AN ANNOTATION FOR A GIVEN ANNOTATION ID AND USER ID.
 */    
export const deleteByIdAndUser = (id, userId) =>
  conn()
    .then(({ conn, table}) => table
      .filter(annotation =>
        annotation('id').eq(id)
          .and(
            annotation('body').contains(body => body('creator')('id').eq(userId))))
      .delete()
      .run(conn));

      
/**
 * LISTS ALL ANNOTATIONS CREATED OR UPDATED SINCE THE GIVEN DATE.
 */
export const listRecent = since =>
  conn()
    .then(({ conn, table}) => table
      .filter(annotation =>
        annotation('lastUpdated').date().during(since, r.now()))
    .run(conn))
    .then(cursor => cursor.toArray().map(removeInternalFields));