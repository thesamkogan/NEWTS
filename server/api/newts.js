const router = require('express').Router()
const { Newt } = require('../db/models')
const HttpError = require('../utils/HttpError');

module.exports = router

router.param('newtid', (req, res, next, id) => {
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
      return null
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
  req.body.userId = req.session.passport.user;
  Newt.create(req.body)
  .then(newt => res.json(newt))
  .catch(next)
})

router.delete('/:newtid', (req, res, next) => {
  Newt.destroy({where: {
    id: req.params.newtid
  }})
    .then(() => res.sendStatus(204))
    .catch(next);
});
