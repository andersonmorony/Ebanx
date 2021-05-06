const _accountRepository = require('../repository/accountRepository');

exports.reset = () => {
    _accountRepository.reset();
}

exports.getAccountById = async (id) => {

    const account = await _accountRepository.getAccountById(id);

    if (!account) throw new Error('Account not found');

    return account;

}

exports.getBalanceById = async (id) => {

    const account = await exports.getAccountById(id);

    return account.balance;
}

exports.postEvent = async (data) => {

    const account = await _accountRepository.getAccountById(data.destination);

    if (!account) {
        return await _accountRepository.createAccount({
            id: data.destination,
            balance: data.amount
        });
    } else {
        return await _accountRepository.deposit({
            id: data.destination,
            balance: data.amount
        });
    }

}


