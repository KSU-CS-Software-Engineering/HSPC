const router = require('express').Router();
const statusResponses = getHelper('status-response');
const teamService = getService('team');

router.get('/admindash', (req, res) => {
    teamService.getAllTeams()
        .then((userdata) => {
            statusResponses.ok(res, userdata);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;