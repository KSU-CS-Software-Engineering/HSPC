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
    console.log('API running on port ' + server.address().port);
});