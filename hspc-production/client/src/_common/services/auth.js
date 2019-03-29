import request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/auth';

class AuthService {
    constructor() {
        this.authenticatedUser = null;
    }

    /*
    * Calls the API and verifies the users login credentials.
    */
    isAuthenticated() {
        return new Promise((resolve, reject) => {
            if (this.authenticatedUser) return resolve(true);
            this.validate().then((response) => resolve(response.statusCode === 200))
                .catch((err) => resolve(false));
        });
    }

    /*
    * Calls the API and registers a new user object in the database.
    */
    register(teamName, firstName, lastName, email, phone, password, accessLevel, requestLevel) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/register`,
                headers: {},
                json: true,
                body: {
                    teamName: teamName,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    password: password,
                    accessLevel: accessLevel,
                    requestLevel: requestLevel
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }

    /*
    * Calls the API and registers a new Event object in the database.
    */
    login(email, password) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/login`,
                headers: {},
                json: true,
                body: {
                    email: email,
                    password: password
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                if (response.statusCode === 200) {
                    this.authenticatedUser = body;
                }
                resolve(response);
            });
        });
    }

    /*
    * Helper function for isAuthenticated.
    */
    validate() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `${controllerUrl}/validate`,
                headers: {}
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode !== 200) return reject(err || response);
                if (response.statusCode === 200) this.authenticatedUser = body;
                resolve(response);
            });
        });
    }
}

export default new AuthService();