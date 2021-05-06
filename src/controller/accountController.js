const accountService = require('../services/accountServices');

const reset = (req, res) => {

   accountService.reset();
   res.status(200).send('OK');

};

module.exports = {
    reset
}