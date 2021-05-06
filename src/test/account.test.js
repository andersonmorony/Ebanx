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
    expect(account).toStrictEqual({ destination: { id: '100', balance: 10 } });

});

test('should 201 deposit', async () => {

    const data = { type: "deposit", destination: "100", amount: 10 };

    await request('http://localhost:3030/event', 'POST', data);
    const response = await request('http://localhost:3030/event', 'POST', data);

    const account = response.data;

    expect(response.status).toBe(201);
    expect(account).toStrictEqual({ destination: { id: '100', balance: 20 } });


});

test('should get balance 200', async () => {

    const response = await request('http://localhost:3030/balance?account_id=100', 'GET');

    const balance = response.data;

    expect(response.status).toBe(200);
    expect(balance).toBe(20);
})

test('should Withdraw from non-existing account 404', async () => {

    const data = { "type": "withdraw", "origin": "200", "amount": 10 }

    const response = await request('http://localhost:3030/event', 'POST', data);

    expect(response.status).toBe(404);

})

test.only('should # Withdraw from existing account 201', async () => {

    const data1 = { type: "deposit", destination: "100", amount: 20 };
    const data2 = { type: "withdraw", origin: "100", amount: 5 }

    //Create Account
    await request('http://localhost:3030/event', 'POST', data1);

    
    const response = await request('http://localhost:3030/event', 'POST', data2);

    expect(response.status).toBe(201);
    expect(response.data).toStrictEqual({"origin": {"id":"100", "balance":15}});

})
