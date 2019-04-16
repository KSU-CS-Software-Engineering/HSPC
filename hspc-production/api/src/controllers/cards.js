const router = require('express').Router();
const statusResponses = getHelper('status-response');
const cardService = getService('cards');

router.post('/admindash', (req, res) => {
    const fileName = req.body['fileName'];

    cardService.createCards(fileName)
        .then(() => {
            statusResponses.created(res, `PDF Uploaded Successfully!`);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

router.get('/admindash', (req, res) => {
    eventService.getAllCards()
        .then((cardData) => {
            statusResponses.ok(res, cardData);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;