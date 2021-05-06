const axios = require('axios');

const request = (url, method, data) => {
   return axios({url, method, data, validateStatus: false});
};

test('should return 200 OK', async () => {
    const response = await request('http://localhost:3030/reset', 'POST');

    const status = response.status;

    expect(status).toBe(200);

});

test.only('should 404 Not Found', async () => {
    
    const response = await request('http://localhost:3030/balance?account_id=100', 'GET');

    const status = response.status;

    expect(status).toBe(404);

});

