var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/dev-todo-api.sqlite'
}); //when we run sync, sequelize will create the appropriate tables

var db = {}; //we'll export this db from db.js

//need to retrieve models
db.todo = sequelize.import(__dirname + '/models/todo.js');  //sequelize.import lets you load in models from other files
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;