const AnnotationRoutes = (server, options, done) => {

  const { db } = options;
  
  /** Just gets a dummy token for testing **/
  server.post('/login', (req, res) => {
    const { accessToken } = req.body;
    
    if (accessToken) {
      try {
        // This will fail if the token could not be verified
        // against the secret
        const payload = server.jwt.verify(accessToken);

        res.setCookie('auth', accessToken, {
          httpOnly: true,
          sameSite: 'strict'
        }).code(200).send({ user: payload.sub });  
      } catch (error) {
        console.log(error);
        res.code(401).send({ error: 'Not Authorized' });
      }
    } else {
      res.code(401).send({ error: 'Not Authorized' });      
    }
  });

  server.get('/annotation/search', { onRequest: [ server.authenticate, server.authorize ] }, req =>
    db.findBySourceAndUser(req.query.source, req.user.sub));

  server.post('/annotation', { onRequest: [ server.authenticate ] }, req =>
    db.upsertAnnotation(req.body, req.user.sub)
      .then(() => ({ result: 'success' }))
      .catch(error => console.error(error)));

  server.delete('/annotation/:annotationId', { onRequest: [ server.authenticate ] }, req =>
    db.deleteByIdAndUser(req.params.annotationId).then(() => ({ result: 'success' })));

  server.get('/time', { onRequest: [ server.authenticate ] }, req =>
    ({ timestamp: new Date().getTime() }));

  done();
  
}

export default AnnotationRoutes;
