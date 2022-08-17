import Fastify from 'fastify';

import Config from './Config';

import {
  exists, 
  initDB,
  deleteById, 
  findBySource, 
  upsertAnnotation 
} from './db';

/** Init Fastify server **/
const server = Fastify({});

/** Init DB if needed **/
exists().then(exists => {
  if (!exists) {
    initDB();
  }
});

server.get('/annotation/search', request =>
  findBySource(request.query.source));

server.post('/annotation', request =>
  upsertAnnotation(request.body).then(() => ({ result: 'success' })));

server.delete('/annotation/:annotationId', request =>
  deleteById(`#${request.params.annotationId}`).then(() => ({ result: 'success' })));

const start = async () => {
  try {
    server.listen({ port: Config.API_PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();