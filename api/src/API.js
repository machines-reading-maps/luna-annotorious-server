import Fastify from 'fastify';
import Cookie from '@fastify/cookie';
import autoload from '@fastify/autoload';
import path from 'path';

const API = (db, opts = {}) => {
  const server = Fastify(opts);

  server.register(Cookie);

  server.register(autoload, {
    dir: path.join(__dirname, 'plugins')
  });

  server.after(() => {

    /** Just gets a dummy token for testing **/
    server.get('/login', (req, res) => {
      const token = server.jwt.sign({ id: 'https://rainersimon.io/users/rainer', fullname: 'Rainer Simon' });

      res.setCookie('token', token, {
        // TODO needs extra params for security!
      }).code(200).send({ token });
    });

    server.get('/me', { onRequest: [ server.authenticate ] }, req => {
      // TODO retrieve the token and return username
    });

    server.get('/annotation/search', req =>
      db.findBySource(req.query.source));

    server.post('/annotation', req =>
      db.upsertAnnotation(req.body).then(() => ({ result: 'success' })));

    server.delete('/annotation/:annotationId', req =>
      db.deleteById(req.params.annotationId).then(() => ({ result: 'success' })));

    server.get('/', req => ({ ...req.user }));

  });

  return server;
}

export default API;