const router = require('express').Router();
const statusResponses = getHelper('status-response');
const teamService = getService('team');

router.post('/registerteam', (req, res) => {
    const teamName = req.body['teamName'];
    const schoolName = req.body['schoolName'];
    const schoolAddress = req.body['schoolAddress'];
    const stateCode = req.body['stateCode'];
    const questionLevel = req.body['questionLevel'];

    teamService.registerTeam(teamName, schoolName, schoolAddress, stateCode, questionLevel)
        .then(() => {
            statusResponses.created(res, `Team Successfully Created!`);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

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