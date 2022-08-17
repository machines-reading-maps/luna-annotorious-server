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

server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await server.listen({ port: Config.API_PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();