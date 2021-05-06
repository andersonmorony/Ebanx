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

    }catch{
        res.status(404).send('0');
    }
}

const event = async (req, res) => {
    const data = req.body;
    let account;

    if(data.type === 'deposit'){
        account = await accountService.postEvent(data);
    }
    return res.status(201).send({destination: account});
}

module.exports = {
    reset,
    balance,
    event
}