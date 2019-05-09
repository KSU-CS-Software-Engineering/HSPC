const router = require('express').Router();
const statusResponses = getHelper('status-response');
const upgradeService = getService('upgrade');

/*
* API Endpoint that returns all accounts within an outstanding request for different permssions.
*
* @author: Daniel Bell
* @param {string} endpoint location
* @param {JSON} callback function containing request and response data from the client.
*/
router.get('/view', (req, res) => {
    upgradeService.getAllUpgrades()
        .then((requestdata) => {
            statusResponses.ok(res, requestdata);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

/*
* API Endpoint that changes the requesting account's permission level based on the action of an administrator.
*
* @author: Daniel Bell
* @param {string} endpoint location
* @param {JSON} callback function containing request and response data from the client.
*/
router.post('/edit', (req, res) => {
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