import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/user';

class userService {
    constructor() {
        this.users = null;
        this.teams = null;
        this.events = null;
        this.userRequests = null;
    }

    /*
     * WORKING
     * Returns an array of all registered users.
     */
    getAllUsers() {
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
                    this.users = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }

    /*
     * SUSPECT
     * Returns an array of all access upgrade requests.
     */
    getAllRequests() {
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

    /*
     * SUSPECT
     * Returns a list of created teams.
     */
    getAllTeams() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `${controllerUrl}/advisordash`,
                headers: {}
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode !== 200)
                    return reject(err || response);
                if (response.statusCode === 200) {
                    this.teams = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }

    /*
     * PARTIALLY WORKING
     * Returns a of scheduled events.
     */
    getAllEvents() {
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
                    this.events = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }

    /*
     * SUSPECT
     * Registers a new team.
     */
    registerTeam(teamName, schoolName, schoolAddress, stateCode, questionLevel) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/registerteam`,
                headers: {},
                json: true,
                body: {
                    teamName: teamName,
                    schoolName: schoolName,
                    address: schoolAddress,
                    state: stateCode,
                    questionLevel: questionLevel
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }
}

export default new userService();