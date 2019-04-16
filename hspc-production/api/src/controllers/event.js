const router = require('express').Router();
const statusResponses = getHelper('status-response');
const eventService = getService('event');

router.post('/admindash', (req, res) => {
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

router.get('/admindash', (req, res) => {
    eventService.getEventHistory()
        .then((teamData) => {
            statusResponses.ok(res, teamData);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;