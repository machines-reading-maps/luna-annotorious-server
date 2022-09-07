import API from '../src/API';
import MockDB from './MockDB';

const getToken = server => 
  ({ token: server.jwt.sign({ id: 'https://rainersimon.io/users/rainer', fullname: 'Rainer Simon' }) });

test('requests the "/annotation/search" route', async () => {
  const server = API(MockDB);

  const response = await server.inject({
    method: 'GET',
    url: '/annotation/search?source=http://example.com/images/001'
  });

  expect(response.statusCode).toBe(200);
});

test('requests the "/annotation" POST method', async () => {
  const server = API(MockDB);

  // Need to wait until all plugins are registered
  server.after(async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/annotation',
      cookies: getToken()
    });
  
    expect(response.statusCode).toBe(200);  
  });
});

test('requests the "/annotation" DELETE method', async () => {
  const server = API(MockDB);
  
  server.after(async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: '/annotation/ceabd881-06cb-4d6e-a5c6-3490a7931bc7',
      cookies: getToken()
    });

    expect(response.statusCode).toBe(200);
  });
});