import Fastify from 'fastify';
import Cookie from '@fastify/cookie';
import Autoload from '@fastify/autoload';
import path from 'path';

const API = (db, opts = {}) => {

  const server = Fastify(opts);

  server.register(Cookie);
  
  server.register(Autoload, {
    dir: path.join(__dirname, 'plugins')
  });

  server.register(Autoload, {
    dir: path.join(__dirname, 'routes'),
    options: { db }
  });

  return server;

}

export default API;