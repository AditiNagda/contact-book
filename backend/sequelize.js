const Sequelize = require('sequelize');
const UserModel = require('./models/user')
const contactModel = require('./models/contact')


const sequelize = new Sequelize('contactbook', 'postgres', '9166772022', {
    host: 'localhost',
    dialect: 'postgres'
  });

  const User = UserModel(sequelize, Sequelize)
  const Contact=contactModel(sequelize,Sequelize)

  // sequelize.sync({ force: true })
  // .then(() => {
  //   console.log(`Database & tables created!`)
  // })

  module.exports = {
    User,
    Contact
  }