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

exports.deposit = (data) => {

  const account = _accountRepository.getAccountById(data.destination);
  let response;

  if (!account) {
    response = _accountRepository.createAccount({ id: data.destination, balance: data.amount });
  } else {
    response = _accountRepository.deposit({ id: data.destination, balance: data.amount });
  }
  return { destination : response }
}

exports.withdraw = (data) => {
  exports.getAccountById(data.origin);

  const response = _accountRepository.withdraw(data);

  return {origin : response }

}


