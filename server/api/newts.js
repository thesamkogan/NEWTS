const router = require('express').Router()
const { Newt } = require('../db/models')
const HttpError = require('../utils/HttpError');

module.exports = router

router.param('id', (req, res, next, id) => {
  Newt.findById(id, {
    include: [{
      // model: Category,
      // as: 'categories',
      // required: false,
      // through: { attributes: [] },
    }],
  })
    .then(newt => {
      if (!newt) throw new HttpError(404);
      req.newt = newt;
      next();
    })
    .catch(next);
});

router.get('/', (req, res, next) => {

  Newt.findAll({
    where: {
      userId: req.session.passport.user
    }
  })
    .then(newts => res.json(newts))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Newt.create(req.body)
  .then(newt => res.json(newt))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  req.newt
    .update(req.body)
    .then(edited => {
      console.log('edited');
      return res.json(edited)})
    .catch(next)
});
