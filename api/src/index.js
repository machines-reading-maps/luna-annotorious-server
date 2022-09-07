import API from './API';
import Config from './Config';

import db from './db';

db.exists().then(exists => {
  if (!exists)
    db.initDB();
});

const server = API(db);

const start = async () => {
  try {
    server.listen({ port: Config.API_PORT, host: '0.0.0.0' });
    console.log(`Started server on port ${Config.API_PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();