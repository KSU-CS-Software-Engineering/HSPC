const router = require('express').Router();
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

// HIGHLY SUSPECT
router.post('/registerteam', (req, res) => {
    const teamName = req.body['teamName'];
    const schoolName = req.body['schoolName'];
    const schoolAddress = req.body['schoolAddress'];
    const stateCode = req.body['stateCode'];
    const questionLevel = req.body['questionLevel'];

    // add checks

    userService.registerTeam(teamName, schoolName, schoolAddress, stateCode, questionLevel)
        .then(() => {
            statusResponses.created(res, `Team Successfully Created!`);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;