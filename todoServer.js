var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

var todos = [{
    id: 1,
    description: 'Meet mom for lunch',
    completed: false
}, {
    id: 2,
    description: 'Go to Hyvee',
    completed: false
}, {
    id: 3,
    description: 'Take out trash',
    completed: true
}]; //the todo will be the model - individual unit that you'll have multiple of
//will be using collection-model language a lot

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

app.listen(port, function(){
    console.log('express listening on port '+ port);
});