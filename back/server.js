const express = require('express');
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const app = express()
const cors = require('cors');
const http = require('http').createServer(app)
const io = require('socket.io')(http)


// Init Middleware

app.use(express.json({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({origin: true, credentials: true}));

// Socket.io (Bonus)

app.set('socketio', io);
io.on('connection', (socket) => {

})

// Connect DB

connectDB()

// Define Routes
app.get('/', (req, res) => res.send('API Running'))
app.use('/api/products/', require('./routes/api/products'));
app.use('/api/auth/', require('./routes/api/auth'));
app.use('/api/users/', require('./routes/api/users'));

// Listen server

const PORT = process.env.PORT || 96;

http.listen(PORT);

