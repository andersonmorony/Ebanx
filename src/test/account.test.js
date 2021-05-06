const axios = require('axios');

const request = (url, method, data) => {
    return axios({ url, method, data, validateStatus: false });
};

test('should return 200 OK', async () => {
    const response = await request('http://localhost:3030/reset', 'POST');

    const status = response.status;

    expect(status).toBe(200);

});

test('should 404 Not Found', async () => {

    const response = await request('http://localhost:3030/balance?account_id=100', 'GET');

    const status = response.status;

    expect(status).toBe(404);

});

test('should 201 createAccount', async () => {

    const data = { type: "deposit", destination: "100", amount: 10 };

    const response = await request('http://localhost:3030/event', 'POST', data);

    const account = response.data;

    expect(response.status).toBe(201);
    expect(account).toStrictEqual({destination: { id: '100', balance: 10 } });

});

test.only('should 201 deposit', async () => {

    const data = { type: "deposit", destination: "100", amount: 10 };

    await request('http://localhost:3030/event', 'POST', data);
    const response = await request('http://localhost:3030/event', 'POST', data);

    const account = response.data;

    expect(response.status).toBe(201);
    expect(account).toStrictEqual({destination: { id: '100', balance: 20 } });


});

test.only('should get balance 200', async () => {
    
    const response = await request('http://localhost:3030/balance?account_id=100', 'GET');

    const balance = response.data;

    expect( response.status).toBe(200);
    expect(balance).toBe(20);
})