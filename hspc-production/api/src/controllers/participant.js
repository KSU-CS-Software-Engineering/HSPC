const router = require('express').Router();
const statusResponses = getHelper('status-response');
const participantService = getService('participant');

/*
* Registers existing teams to a pre-exisiting event.
*/
router.post('/admindash', (req, res) => {
    const TeamName = req.body['TeamName'];
    const FirstName = req.body['FirstName'];
    const LastName = req.body['LastName'];
    const SchoolName = req.body['SchoolName'];
    const StateCode = req.body['StateCode'];
    const EventDate = req.body['EventDate'];

    participantService.addParticipant(TeamName, FirstName, LastName, SchoolName, StateCode, EventDate)
        .then(() => {
            statusResponses.created(res, `Team Registered to Event!`);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

/*
* Returns a list of users registered and the events they're registered to.
*/
router.get('/admindash', (req, res) => {
    participantService.getAllParticipants()
        .then((teamData) => {
            statusResponses.ok(res, teamData);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;