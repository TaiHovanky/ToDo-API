var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.get('/', function(req, res){
    res.send('Todo API root');
});

app.listen(port, function(){
    console.log('express listening on port '+ port);
});