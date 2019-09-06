module.exports = (sequelize, type) => {
    return sequelize.define('contacts', {
        userid: {
          type: type.INTEGER
        },
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:type.STRING
        },
        contact:{
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
        city:{
            type:type.STRING
        }

    })
}