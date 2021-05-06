const accountService = require('../services/accountServices');

const reset = (req, res) => {

   accountService.reset();
   res.status(200).send('OK');

};

const balance = async (req, res) => {
    try {
        const id = req.params.account_id;
        const balance = await accountService.getBalanceById(id);
        res.status(200).send(balance);

    }catch{
        res.status(404).send('0');
    }
}

module.exports = {
    reset,
    balance
}