var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var app = express();

var port = process.env.PORT || 5000;

var todos = []; //the todo will be the model - individual unit that you'll have multiple of
//will be using collection-model language a lot
var todoNextId = 1;

app.use(bodyParser.json()); //anytime a json request comes in, request parses it and we can access it via request.body

app.get('/', function(req, res){
    res.send('Todo API root');
});
//Get/todos
//Get/todos/:id
app.get('/todos', function(req, res){
    var queryParams = req.query;
    var filteredTodos = todos;
    if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
        filteredTodos = _.where(filteredTodos, {completed: true});
    } else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
        filteredTodos = _.where(filteredTodos, {completed: false});
    }

    if(queryParams.hasOwnProperty('q') && queryParams.q.length > 0){
        filteredTodos = _.filter(filteredTodos, function(todo){
            return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
        });
    }
    res.json(filteredTodos); //res.json converts todos array into JSON
});

app.get('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId}); //searches through todo array for element that has an id equal to todoId
    //todos.forEach(function(todo){
        //if(todo.id === todoId){
            //matchedTodo = todo;
        //} 
    //});  <--replaced by the underscore function _.findWhere
    if(matchedTodo){
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }

});

//POST will resemble get /todos. There's no :id since the id is generated after the POST
app.post('/todos', function(req, res){
    var body = _.pick(req.body, 'description', 'completed');
    db.todo.create(body).then(function(todo){
        res.json(todo.toJSON()); //there's a lot of other data that needs to be converted toJSON
    }, function(e){
        res.status(400).json(e);
    });
    //var body = _.pick(req.body, 'description', 'completed'); //use _.pick to remove extraneous data from req.body object
    //if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        //return res.status(400).send();
    //} //if the completed field isn't a Boolean or if the description isn't a string, return a 400 status
    //the .trim removes the spaces and so if without its spaces, the entry's length is 0, we get the error
    //body.description = body.description.trim(); //remove whitespaces before and after the description string
    //body.id = todoNextId++;
    //todos.push(body);
    //res.json(body);
});

//Delete /todos/:id
app.delete('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId}); //_.findWhere is used to find an array element with id === todoId
    if(!matchedTodo){
        res.status(404).json({"error": "no todo found with that ID"});
    } else {
        todos = _.without(todos, matchedTodo); //_.without returns an array without the matchedTodo - this deletes the array element
        res.json(matchedTodo); 
    }
});

//PUT/todos/:ID
app.put('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if(!matchedTodo){
        return res.status(404).send();
    }

    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
        validAttributes.completed = body.completed;
    } else if(body.hasOwnProperty('completed')){
        //runs if property exists but isn't Boolean'
        return res.status(400).send();
    } 
    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
        validAttributes.description = body.description;
    } else if(body.hasOwnProperty('description')){
        return res.status(400).send();
    }
    
    _.extend(matchedTodo, validAttributes); //don't need to explicitly update array - objects are passed by reference
    res.json(matchedTodo);
});

db.sequelize.sync().then(function(){
    app.listen(port, function(){
        console.log('express listening on port '+ port);
    });
});

