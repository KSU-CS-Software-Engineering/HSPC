const router = require('express').Router();
const statusResponses = getHelper('status-response');
const upgradeService = getService('upgrade');

router.get('/admindash', (req, res) => {
    upgradeService.getAllUpgrades()
        .then((requestdata) => {
            statusResponses.ok(res, requestdata);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;