const router = require('express').Router();
const statusResponses = getHelper('status-response');
const teamService = getService('team');

/*
* API Endpoint serving the creation of new teams.
*
* @author: Daniel Bell
* @param {string} endpoint location
* @param {JSON} callback function containing request and response data from the client.
*/
router.post('/create', (req, res) => {
    const teamName = req.body['teamName'];
    const schoolName = req.body['schoolName'];
    const schoolAddress = req.body['schoolAddress'];
    const stateCode = req.body['stateCode'];
    const questionLevel = req.body['questionLevel'];
    const advisor = req.body['advisor'];
    const advisorEmail = req.body['advisorEmail'];

    teamService.registerTeam(teamName, schoolName, schoolAddress, stateCode, questionLevel, advisor, advisorEmail)
        .then(() => {
            statusResponses.created(res, `Team Successfully Created!`);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

/*
* API Endpoint that returns all teams stored within the database.
*
* @author: Daniel Bell
* @param {string} endpoint location
* @param {JSON} callback function containing request and response data from the client.
*/
router.get('/view', (req, res) => {
    teamService.getAllTeams()
        .then((teamData) => {
            statusResponses.ok(res, teamData);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;