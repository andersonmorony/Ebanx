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
    response = _accountRepository.deposit(data);
  }
  return { destination : response }
}

exports.withdraw = (data) => {
  
  //Verifier if accounts exists
  exports.getAccountById(data.origin);

  const response = _accountRepository.withdraw(data);

  return {origin : response }

}

exports.transfer = (data) => {

  //Verifier if accounts exists
  exports.getAccountById(data.origin);
  exports.getAccountById(data.destination);

  return _accountRepository.transfer(data);

}


