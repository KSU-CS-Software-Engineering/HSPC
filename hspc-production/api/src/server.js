require('dotenv').config();
const pathJoin = require('path').join;
const api = require('express')();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const helperDirectory = pathJoin(__dirname, 'helpers');
const controllerDirectory = pathJoin(__dirname, 'controllers');
const serviceDirectory = pathJoin(__dirname, 'services');
const modelDirectory = pathJoin(__dirname, 'models');

global.getHelper = (helperName => require(pathJoin(helperDirectory, helperName)));
global.getService = (serviceName => require(pathJoin(serviceDirectory, serviceName)));
global.getModel = (modelName => require(pathJoin(modelDirectory, modelName)));

// Set Up Middleware
api.use(helmet());
api.use(cors({
    origin: [process.env.APP_URL], // domain location(s)
}));
api.use(morgan('combined'));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({
    extended: true
}));

// used for persistent login (this has not yet been tested)
api.use(cookieParser());
api.use(session({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 86400
    }
}));
api.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

// Set Up Controllers
require('fs').readdirSync(controllerDirectory).forEach((controller) => {
    api.use(`/${controller.substring(0, controller.lastIndexOf('.'))}`, require(pathJoin(controllerDirectory, controller)));
});

// Start API Listener
const server = api.listen(process.env.PORT || 3001, () => {
    console.log('API running on port ' + server.address().port + "\n");
});

// Web Socket
const io = require('socket.io')();

io.on('connection', function (socket) {
    console.log(socket.id, 'Connected');
    socket.on('disconnect', function () {
        console.log(socket.id, 'Disconnected');
    });
    socket.on('click', function (data) {
        //console.log(data);
        //io.sockets.emit('broadcast', data);
        socket.broadcast.to(1).emit('broadcast', data);
    });
    socket.on('scoreboard', function() {
        socket.join(1);
    });
    socket.on('exit scoreboard', function(){
        socket.leave(1);
    })
});

const port = 8000;
io.listen(port);
console.log('Websocket listening on port', port);