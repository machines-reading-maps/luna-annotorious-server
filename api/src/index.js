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
    server.listen({ port: Config.API_PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();