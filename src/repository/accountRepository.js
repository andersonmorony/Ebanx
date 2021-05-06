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
    let account = exports.getAccountById(data.id);
    account.balance += data.balance;
    return account;
}
