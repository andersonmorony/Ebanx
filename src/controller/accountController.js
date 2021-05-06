const accountService = require('../services/accountServices');

const reset = (req, res) => {

  accountService.reset();
  res.status(200).send('OK');

};

const balance = async (req, res) => {
  try {
    const id = req.query.account_id;
    const balance = await accountService.getBalanceById(id);
    res.status(200).json(balance);

  } catch {
    res.status(404).send('0');
  }
}

const event = async (req, res) => {
  let response;
  const data = req.body;

  try {

    switch (data.type) {
      case 'deposit':
        response = await accountService.deposit(data);
        break;
      case 'withdraw':
        response = await accountService.withdraw(data);
        break;
      case 'transfer':
        response = await accountService.transfer(data);
    }
    res.status(201).send(response);

  } catch (e) {
    res.status(404).send('0');
  }
}

module.exports = {
  reset,
  balance,
  event
}