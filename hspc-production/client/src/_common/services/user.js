import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/user';

class userService {
    constructor() {
        this.users = null;
        this.teams = null;
        this.events = null;
        this.userRequests = null;
    }

    /**************************************************************************************
     * Calls the API and returns a JSON list of all registered users.
     **************************************************************************************/
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

    /**************************************************************************************
     * IN PROGRESS
     * Calls the API and returns a JSON list of all requests for a higher tier account.
     **************************************************************************************/
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

    /**************************************************************************************
     * Calls the API, registers a new user object, and assigns the user to teamName
     **************************************************************************************/
    addUser(teamName, firstName, lastName, email, phone, accesslevel, hashedPassword) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/adduser`,
                headers: {},
                json: true,
                body: {
                    teamName: teamName,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    password: hashedPassword,
                    accessLevel: accesslevel,
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