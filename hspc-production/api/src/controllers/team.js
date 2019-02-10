const router = require('express').Router();
const statusResponses = getHelper('status-response');
const teamService = getService('team');

router.get('/admindash', (req, res) => {
    teamService.getAllTeams()
        .then((teamData) => {
            statusResponses.ok(res, teamData);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;