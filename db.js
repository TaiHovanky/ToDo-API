var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';   //all environment variables are in this object
var sequelize;

if(env ==="production"){ // this is used to connect to PostGres in Heroku
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/dev-todo-api.sqlite'
    }); //when we run sync, sequelize will create the appropriate tables
} // this is used to connect to PostGres in Heroku


var db = {}; //we'll export this db from db.js

//need to retrieve models
db.todo = sequelize.import(__dirname + '/models/todo.js');  //sequelize.import lets you load in models from other files
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;