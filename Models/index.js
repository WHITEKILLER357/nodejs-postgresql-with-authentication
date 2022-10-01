// import module
const {Sequelize} = require('sequelize');
const DataType = require('sequelize');

// database connection with dialect of postgres specify 
const sequelize = new Sequelize(`postgres://postgres:flyers@localhost:5432/postgres`,{dialect:"postgres"})

//checking if connection is done
sequelize.authenticate().then(()=> {
    console.log(`database connected postgres`)
}).catch((err)=>{
    console.log(err)
})

const db ={}
    db.Sequelize= Sequelize
    db.sequelize=sequelize
// connecting to model
db.users = require('./userModel')(sequelize,DataType)

module.exports = db