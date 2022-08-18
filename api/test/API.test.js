import API from '../src/API';
import MockDB from './MockDB';

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

  const response = await server.inject({
    method: 'POST',
    url: '/annotation'
  });

  expect(response.statusCode).toBe(200);
});

test('requests the "/annotation" DELETE method', async () => {
  const server = API(MockDB);
  
  const response = await server.inject({
    method: 'DELETE',
    url: '/annotation/ceabd881-06cb-4d6e-a5c6-3490a7931bc7'
  });

  expect(response.statusCode).toBe(200);
});