import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/user';

/*
* @author: Daniel Bell
*/
class userService {
    constructor() {
        this.users = null;
        this.teams = null;
        this.events = null;
        this.userRequests = null;
    }

    /*
    * Calls the API and returns a JSON list of all registered users.
    */
    getAllUsers() {
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
                    this.users = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }

    /*
    * Calls the API, registers a new user object, and assigns the user to teamName
    * @param {string} text value of the team name the user is being added to
    * @param {string} text value of the first name of the new user
    * @param {string} text value of the last name of the new user
    * @param {string} text value of the email address of the new user
    * @param {string} text value of the access level given to the new user
    * @param {string} encrypted text value of the new user's password
    */
    addUser(teamName, firstName, lastName, email, phone, accesslevel, hashedPassword) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/create`,
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

    /*
    * Calls the API, registers a new user object, and assigns the user to teamName
    * @param {string} text value of the team the new user is being added to
    * @param {string} text value of the existing user's data email address
    */
    addToTeam(teamName, email) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'PATCH',
                url: `${controllerUrl}/edit`,
                headers: {},
                json: true,
                body: {
                    teamName: teamName,
                    email: email,
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