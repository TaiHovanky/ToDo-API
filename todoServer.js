var express = require('express');
var bodyParser = require('body-parser');
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
    res.json(todos); //res.json converts todos array into JSON
});

app.get('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo;
    todos.forEach(function(todo){
        if(todo.id === todoId){
            matchedTodo = todo;
        } 
    });
    if(matchedTodo){
        res.json(matchedTodo);
    } else {
        res.status(404);
    }

});

//POST will resemble get /todos. There's no :id since the id is generated after the POST
app.post('/todos', function(req, res){
    var body = req.body;
    body.id = todoNextId++;
    todos.push(body);
    console.log('description ' + body.description);
    res.json(body);
});


app.listen(port, function(){
    console.log('express listening on port '+ port);
});