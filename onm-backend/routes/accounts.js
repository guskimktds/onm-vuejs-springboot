const router = require('express').Router();
const Account = require('../models/account');

// Find All
router.get('/', (req, res) => {
  console.log("/accounts/ 호출 : ")
  Account.findAll()
    .then((accounts) => {
      if (!accounts.length) return res.status(404).send({ err: 'Account not found' });
      // res.send(`find successfully: ${accounts}`);
      res.send(accounts);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get('/accountid/:accountid', (req, res) => {
  Account.findOneByAccountid(req.params.accountid)
    .then((account) => {
      if (!account) return res.status(404).send({ err: 'Account not found' });
      res.send(`findOne successfully: ${account}`);
    })
    .catch(err => res.status(500).send(err));
});

// Create new todo document
router.post('/', (req, res) => {
    Account.create(req.body)
    .then(account => res.send(account))
    .catch(err => res.status(500).send(err));
});

// Update by accountid
router.put('/accountid/:accountid', (req, res) => {
    Account.updateByAccountid(req.params.accountid, req.body)
    .then(account => res.send(account))
    .catch(err => res.status(500).send(err));
});

// Delete by accountid
router.delete('/accountid/:accountid', (req, res) => {
    Account.deleteByAccountid(req.params.accountid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;