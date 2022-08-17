import API from '../src/API.js';

import MockDB from './MockDB.js';

const test = async () => {
  const server = API(MockDB);

  const response = await server.inject({
    method: 'GET',
    url: '/'
  });

  console.log('status code: ', response.statusCode);
  console.log('body: ', response.body);
}

test();