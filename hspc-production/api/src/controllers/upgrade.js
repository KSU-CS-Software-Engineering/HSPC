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

router.post('/admindash', (req, res) => {
    const email = req.body['email'];
    const requestlevel = req.body['accessLevel'];
    if (requestlevel != undefined) {
        upgradeService.acceptUpgradeRequest(requestlevel, email)
            .then((requestdata) => {
                statusResponses.ok(res, requestdata);
            })
            .catch((err) => {
                statusResponses.serverError(res);
            });
    }
    else{
        upgradeService.removeUpgradeRequest(email)
        .then((requestdata) => {
            statusResponses.ok(res, requestdata);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
    }

});
module.exports = router;