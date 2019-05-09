const router = require('express').Router();
const statusResponses = getHelper('status-response');
const eventService = getService('event');

/*
* API Endpoint serving the scheduling of events.
*
* @author: Daniel Bell
* @param {string} endpoint location
* @param {JSON} callback function containing request and response data from the client.
*/
router.post('/create', (req, res) => {
    const eventLocation = req.body['eventLocation'];
    const eventDate = req.body['eventDate'];
    const eventTime = req.body['eventTime'];
    const eventDes = req.body['eventDes'];

    eventService.createEvent(eventLocation, eventDate, eventTime, eventDes)
        .then(() => {
            statusResponses.created(res, `Event Scheduled Successfully!`);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

/*
* API Endpoint that serves the retrieval of scheduled events from the database.
*
* @author: Daniel Bell
* @param {string} endpoint location
* @param {JSON} callback function containing request and response data from the client.
*/
router.get('/view', (req, res) => {
    eventService.getEventHistory()
        .then((teamData) => {
            statusResponses.ok(res, teamData);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;