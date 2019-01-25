const router = require('express').Router();

const validator = require('validator');
const statusResponses = getHelper('status-response');
const userService = getService('user');

router.get('/admindash', (req, res) => {
    userService.getAllUsers()
    .then((userdata) => {
        statusResponses.ok(res, userdata);
    })
    .catch((err) => {
        statusResponses.serverError(res);
    });
});

module.exports = router;