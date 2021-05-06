const _accountRepository = require('../repository/accountRepository');

exports.reset = () => {
    _accountRepository.reset();
}

