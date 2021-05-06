const express = require('express');
const router = express.Router();

const accountController = require('../controller/accountController');

router.post('/reset', accountController.reset);


module.exports = router;