import Fastify from 'fastify';

const API = (db, opts = {}) => {
  const server = Fastify(opts);

  server.get('/annotation/search', request =>
    db.findBySource(request.query.source));

  server.post('/annotation', request =>
    db.upsertAnnotation(request.body).then(() => ({ result: 'success' })));

  server.delete('/annotation/:annotationId', request =>
    db.deleteById(request.params.annotationId).then(() => ({ result: 'success' })));

  return server;
}

export default API;