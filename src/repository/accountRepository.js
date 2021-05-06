let accounts = [];

exports.reset = () => {
    accounts = [];
};

exports.getAccountById = (id) => {
    return accounts.find(account => account.id === id);
}

exports.createAccount = (data) => {
    accounts.push(data);
    return data;
}

exports.deposit = (data) => {
    let account = exports.getAccountById(data.destination);
    account.balance += data.amount;
    return account;
}

exports.withdraw = (data) => {
    let account = exports.getAccountById(data.origin);
    account.balance -= data.amount;
    return account;
}

exports.transfer = (data) => {  
    const accountOrigin = exports.withdraw({origin: data.origin, amount: data.amount});
    const accountDestination = exports.deposit({destination: data.destination, amount: data.amount});

    return {
        "origin" : accountOrigin,
        "destination" : accountDestination
    }

}