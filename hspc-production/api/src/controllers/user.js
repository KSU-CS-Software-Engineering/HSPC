const router = require('express').Router();
const statusResponses = getHelper('status-response');
const userService = getService('user');
const authService = getService('auth');

router.get('/admindash', (req, res) => {
    userService.getAllUsers()
        .then((userdata) => {
            statusResponses.ok(res, userdata);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

router.post('/adduser', (req, res) => {
    const teamName = req.body['teamName'];
    const firstName = req.body['firstName'];
    const lastName = req.body['lastName'];
    const email = req.body['email'];
    const phone = req.body['phone'];
    const password = req.body['password'];
    const accesslevel = req.body['accessLevel'];
    console.log(teamName, firstName, lastName, email, password, accesslevel);
    // add checks
    
    userService.register(teamName, firstName, lastName, email, phone, accesslevel, password)
        .then(data => {
            if (data.length > 0) return statusResponses.conflict(res, `'${email}' could not be registered`);
            authService.generateHash(password)
                .then((hashedPassword) => {
                    userService.register(teamName, firstName, lastName, email, phone, accesslevel, hashedPassword)
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

module.exports = router;