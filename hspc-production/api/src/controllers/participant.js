const router = require('express').Router();
const statusResponses = getHelper('status-response');
const participantService = getService('participant');

/*
 * Registers existing teams to a pre-exisiting event.
 */
router.post('/admindash', (req, res) => {
    const TeamName = req.body['TeamName'];
    const SchoolName = req.body['SchoolName'];
    const StateCode = req.body['StateCode'];
    const QuestionLevel = req.body['QuestionLevel'];
    const EventDate = req.body['EventDate'];

    // checks if team and event combination already exists
    participantService.getAllParticipants()
        .then((teamData) => {
            for (let i = 0; i < teamData.length; i++) {
                if (teamData[i].TeamName === TeamName && teamData[i].EventDate === EventDate) {
                    return statusResponses.conflict(res, `'${email}' could not be registered`);
                }
            }
            participantService.addParticipant(TeamName, SchoolName, StateCode, QuestionLevel, EventDate)
                .then(() => {
                    statusResponses.created(res, `Team Registered to Event!`);
                })
                .catch((err) => {
                    statusResponses.serverError(res);
                });
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