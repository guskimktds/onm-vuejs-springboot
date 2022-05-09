const router = require('express').Router();
const LocalCodes = require('../models/localCodes');

// Find All
router.get('/', (req, res) => {
  console.log("/code/ 호출 : ")
  LocalCodes.findAll()
    .then((codes) => {
      if (!codes.length) return res.status(404).send({ err: 'Code not found' });
      // res.send(`find successfully: ${codes}`);
      res.send(codes);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get('/code/:code', (req, res) => {
    LocalCodes.findOneByCode(req.params.code)
    .then((code) => {
      if (!code) return res.status(404).send({ err: 'Code not found' });
      res.send(`findOne successfully: ${code}`);
    })
    .catch(err => res.status(500).send(err));
});

//query to condition
router.post('/query', (req, res) => {
  console.log("/code/query 호출 : ", req.body)
  const url = req.body.params.url
  const name = req.body.params.name
  const websocket = req.body.params.websocket

  console.log("/code/query 파라미터: ", url, name, websocket)

  LocalCodes.findByQuery(url, name, websocket)
    .then((codes) => {
      if (!codes) return res.status(404).send({ err: 'codes not found' });
      
      res.send(codes);
    })
    .catch(err => res.status(500).send(err));
});

// Create new code
router.post('/', (req, res) => {
  console.log('Create new code : ', req.body)
  LocalCodes.create(req.body)
    .then(code => res.send(code))
    .catch(err => res.status(500).send(err));
});

// Update by code
router.post('/update', (req, res) => {
  console.log('update  : ', req.body)
  // const filter = {
  //   '_id': req.body._id
  // }
    LocalCodes.updateByCode({'_id': req.body._id }, req.body)
    .then(code => res.send(code))
    .catch(err => res.status(500).send(err));
});

// Delete by code
// router.delete('/code/:code', (req, res) => {
//     LocalCodes.deleteByCode(req.params.code)
//     .then(() => res.sendStatus(200))
//     .catch(err => res.status(500).send(err));
// });
router.post('/delete', (req, res) => {
  console.log('delete  : ', req.body)
    LocalCodes.deleteByCode(req.body._id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;