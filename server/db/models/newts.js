const Sequelize = require('sequelize')
const db = require('../db')

const Newt = db.define('newt', {
  content: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Newt;
