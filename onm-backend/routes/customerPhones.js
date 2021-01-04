const router = require('express').Router();
const CustomerPhones = require('../models/customerPhones');

// Find All
router.get('/', (req, res) => {
  console.log("/customer-phone/ 호출 : ")
  CustomerPhones.findAll()
    .then((customerPhones) => {
      if (!customerPhones.length) return res.status(404).send({ err: 'Customer Phone Info not found' });
      // res.send(`find successfully: ${customerPhones}`);
      res.send(customerPhones);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by Customer Userid
router.post('/userid', (req, res) => {
  // console.log("/customer-phone/userid 호출 : ",req.body.usrId)
  console.log("/customer-phone/userid 호출 : ",req.body.params.userId)
  CustomerPhones.findByUsrId(req.body.params.userId)
    .then((customerPhones) => {
      if (!customerPhones) return res.status(404).send({ err: 'Customer Phone Info not found' });
      // res.send(`findOne successfully: ${account}`);
      res.send(customerPhones);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by Customer UserName
router.post('/username', (req, res) => {
  console.log("/customer-phone/username 호출 : ",req.body.params.userName)
  CustomerPhones.findByUsrName(req.body.params.userId, req.body.params.userName)
    .then((customerPhones) => {
      if (!customerPhones) return res.status(404).send({ err: 'Customer Phone Info not found' });
      // res.send(`findOne successfully: ${account}`);
      res.send(customerPhones);
    })
    .catch(err => res.status(500).send(err));
});

router.post('/query', (req, res) => {
  console.log("/customer-phone/query 호출 : ", req.body)
  const userid = req.body.params.userId
  const usrName = req.body.params.userName
  const phoneNumber = req.body.params.phoneNum
  const startDate = req.body.params.approveDate[0]
  const endDate = req.body.params.approveDate[1]

  console.log("/customer-phone/query 파라미터: ", userid, usrName, phoneNumber, startDate, endDate)

  CustomerPhones.findByQuery(userid, usrName, phoneNumber, startDate, endDate)
    .then((customerPhones) => {
      if (!customerPhones) return res.status(404).send({ err: 'Customer Phone Info not found' });
      // res.send(`findOne successfully: ${account}`);
      res.send(customerPhones);
    })
    .catch(err => res.status(500).send(err));
});

// Create new customerPhones document
router.post('/', (req, res) => {
  CustomerPhones.create(req.body)
  .then(customerPhones => res.send(customerPhones))
  .catch(err => res.status(500).send(err));
});

// Delete by accountid
router.delete('/delete', (req, res) => {
  console.log("/customer-phone/delete 호출 : ",req.body.phoneNumber)
  CustomerPhones.deleteByPhoneNumber(req.body.phoneNumber)
  .then(() => res.sendStatus(200))
  .catch(err => res.status(500).send(err));
});

module.exports = router;