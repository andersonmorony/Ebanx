let accounts = [];

exports.reset = () => {
    accounts = [];
};

exports.getAccountById = (id) => {
    return accounts.find(account => account.id === id);
}


