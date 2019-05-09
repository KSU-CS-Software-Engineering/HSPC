const router = require('express').Router();
const statusResponses = getHelper('status-response');
const userService = getService('user');
const authService = getService('auth');

/*
* API Endpoint that returns all users stored within the database.
*
* @author: Daniel Bell
* @param {string} endpoint location
* @param {JSON} callback function containing request and response data from the client.
*/
router.get('/view', (req, res) => {
    userService.getAllUsers()
        .then((userdata) => {
            statusResponses.ok(res, userdata);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

/*
* API Endpoint that serves the general creation of new users.
*
* @author: Daniel Bell
* @param {string} endpoint location
* @param {JSON} callback function containing request and response data from the client.
*/
router.post('/create', (req, res) => {
    const teamName = req.body['teamName'];
    const firstName = req.body['firstName'];
    const lastName = req.body['lastName'];
    const email = req.body['email'];
    const phone = req.body['phone'];
    const password = req.body['password'];
    const accesslevel = req.body['accessLevel'];

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

/*
* API Endpoint that adds an existing user to an active team.
*
* @author: Daniel Bell
* @param {string} endpoint location
* @param {JSON} callback function containing request and response data from the client.
*/
router.patch('/edit', (req, res) => {
    const teamName = req.body['teamName'];
    const email = req.body['email'];

    userService.assignToTeam(teamName, email)
        .then(() => {
            statusResponses.created(res, `${email}' successfully update!`);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;