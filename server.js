var express = require('express');
var socket = require('socket.io');
const path = require("path");
const port = process.env.PORT || 8080;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __myPath = path.resolve();

app.use(express.static(path.join(__myPath, "/frontend/build")));
	
app.get("*", (req, res) =>
    res.sendFile(path.resolve(__myPath, "frontend", "build", "index.html"))
);

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

var io = socket(server, {
    cors: {
      origin: '*',
    }
});

io.sockets.on('connection', connection);

var text = {
    text: ''
};

function connection(socket){
    console.log('a new user with id ' + socket.id + " has entered");
    console.log(socket.data)
    socket.emit('newUser', text);

    socket.on('text', handleTextSent);

    function handleTextSent(data){
        text.text = data.text
        io.sockets.emit('text', data);
    }
}