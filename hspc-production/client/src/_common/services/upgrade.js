import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/upgrade';

class upgradeService {
    constructor() {
        this.userRequests = null;
    }

    /**************************************************************************************
     * Calls the API and returns a JSON list of all requests for a higher tier account.
     **************************************************************************************/
    getAllUpgrades() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `${controllerUrl}/admindash`,
                headers: {}
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode !== 200)
                    return reject(err || response);
                if (response.statusCode === 200) {
                    this.userRequests = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }

    /**************************************************************************************
     * IN PROGRESS - Work on API side
     * Calls the API and sets the AccessLevel value to the value of RequestLevel.
     **************************************************************************************/
    acceptUpgradeRequest(email, level) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/admindash`,
                headers: {},
                json: true,
                body: {
                    email: email,
                    accessLevel: level
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }

    /**************************************************************************************
     * IN PROGRESS - Work on API side
     * Calls the API and sets the RequestLevel value to ''.
     **************************************************************************************/
    removeUpgradeRequest(email) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/admindash`,
                headers: {},
                json: true,
                body: {
                    email: email
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }
}

export default new upgradeService();