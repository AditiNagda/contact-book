module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name:{
            type:type.STRING
        },
        email:{
            type:type.STRING,
            allowNull: true,
            unique: true,
            validate: {
             max: 50
            }
        },
        password:{
            type:type.STRING
        }

    })
}