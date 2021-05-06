const _accountRepository = require('../repository/accountRepository');

exports.reset = () => {
    _accountRepository.reset();
}

exports.getAccountById = (id) => {

    const account = _accountRepository.getAccountById(id);

    if (!account) throw new Error('Account not found');

    return account;


}

exports.getBalanceById = (id) => {

    const account = exports.getAccountById(id);

    return account.balance;
}
