const router = require('express').Router();
const validator = require('validator');
const statusResponses = getHelper('status-response');
const authService = getService('auth');
const userService = getService('user');

router.post('/register', (req, res) => {
    const teamName = req.body['teamName'];
    const firstName = req.body['firstName'];
    const lastName = req.body['lastName'];
    const email = req.body['email'];
    const phone = req.body['phone'];
    const password = req.body['password'];
    const accesslevel = req.body['accessLevel'];
    const requestlevel = req.body['requestLevel'];

    if (!(firstName && lastName && email && password)) return statusResponses.badRequest(res, "FirstName, LastName, Email, and Password are required");
    if (!validator.isEmail(email)) return statusResponses.badRequest(res, 'Email must be a properly formatted email address');
    if (password.length < 8) return statusResponses.badRequest(res, 'Password must be at least 8 characters');

    // checks for unique email and encrypts.
    userService.getLogin(email)
        .then(data => {
            if (data.length > 0) return statusResponses.conflict(res, `'${email}' could not be registered`);
            authService.generateHash(password)
                .then((hashedPassword) => {
                    userService.register(teamName, firstName, lastName, email, phone, accesslevel, requestlevel, hashedPassword)
                        .then(() => {
                            statusResponses.created(res, `${email}' successfully registered!`);
                        })
                        .catch((err) => {
                            statusResponses.serverError(res);
                        });
                })
                .catch((err) => {
                    statusResponses.serverError(res);
                });
        });
});

router.post('/login', (req, res) => {
    const email = req.body['email']
    const password = req.body['password'];
    if (!(email && password)) return statusResponses.badRequest(res, "Email and Password are required");
    if (!validator.isEmail(email)) return statusResponses.badRequest(res, 'Email must be a properly formatted email address');

    userService.getLogin(email)
        .then(data => {
            if (data.length === 0) return statusResponses.unauthorized(res, `'${email}' could not be logged in`);
            if (data.length > 1) return statusResponses.serverError(res);
            data = data[0];
            authService.checkPassword(password, data.EncryptedPassword)
                .then(() => {
                    // sets up user session for persistent login (has not been tested)
                    const user = {
                        userId: data.UserID,
                        email: email,
                        accesslevel: data.AccessLevel
                    }
                    req.session.user = user;
                    statusResponses.ok(res, user);
                })
                .catch((err) => {
                    if (err) {
                        statusResponses.serverError(res);
                    } else {
                        statusResponses.unauthorized(res, `'${email}' could not be logged in`);
                    }
                });
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;