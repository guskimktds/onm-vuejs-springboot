const router = require('express').Router();
const Codes = require('../models/codes');

// Find All
router.get('/', (req, res) => {
  console.log("/code/ 호출 : ")
  Codes.findAll()
    .then((codes) => {
      if (!codes.length) return res.status(404).send({ err: 'Code not found' });
      // res.send(`find successfully: ${codes}`);
      res.send(codes);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get('/code/:code', (req, res) => {
  Codes.findOneByCode(req.params.code)
    .then((code) => {
      if (!code) return res.status(404).send({ err: 'Code not found' });
      res.send(`findOne successfully: ${code}`);
    })
    .catch(err => res.status(500).send(err));
});

//query to condition
router.post('/query', (req, res) => {
  console.log("/code/query 호출 : ", req.body)
  const codeClass = req.body.params.codeClass
  const code = req.body.params.code
  const name = req.body.params.name
  const type = req.body.params.type

  console.log("/code/query 파라미터: ", codeClass, code, name, type)

  Codes.findByQuery(codeClass, code, name, type)
    .then((codes) => {
      if (!codes) return res.status(404).send({ err: 'codes not found' });
      
      res.send(codes);
    })
    .catch(err => res.status(500).send(err));
});

// Create new code
router.post('/', (req, res) => {
  console.log('Create new code : ', req.body)
    Codes.create(req.body)
    .then(code => res.send(code))
    .catch(err => res.status(500).send(err));
});

// Update by code
router.post('/update', (req, res) => {
    Codes.updateByCode(req.body.code, req.body)
    .then(code => res.send(code))
    .catch(err => res.status(500).send(err));
});

// Delete by code
router.delete('/code/:code', (req, res) => {
    Codes.deleteByCode(req.params.code)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;