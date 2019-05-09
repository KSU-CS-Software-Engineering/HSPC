import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/upgrade';

/*
* @author: Daniel Bell
*/
class upgradeService {
    constructor() {
        this.userRequests = null;
    }

    /*
    * Calls the API and returns a JSON list of all requests for a higher tier account.
    */
    getAllUpgrades() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `${controllerUrl}/view`,
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

    /*
    * Calls the API and sets the AccessLevel value to the value of RequestLevel.
    * @param {string} text value of the requesting account's email address
    * @param {string} text value of the requested permission level
    */
    acceptUpgradeRequest(email, level) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/edit`,
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

    /*
    * Calls the API and resets the RequestLevel value to the default.
    * @param {string} text value of the requesting account's email address
    */
    removeUpgradeRequest(email) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/edit`,
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