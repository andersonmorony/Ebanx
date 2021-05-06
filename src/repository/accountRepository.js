let accounts = [];

exports.reset = () => {
    accounts = [];
};

exports.getAccountById = (id) => {
    return accounts.find(account => account.id === id);
}

exports.createAccount = (account) => {
    accounts.push(account);
    return account;
}
