import request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/auth';

class AuthService {
    constructor() {
        this.authenticatedUser = null;
    }
    isAuthenticated() {
        return new Promise((resolve, reject) => {
            if (this.authenticatedUser) return resolve(true);
            this.validate().then((response) => resolve(response.statusCode === 200))
                .catch((err) => resolve(false));
        });
    }
    register(teamName, firstName, lastName, email, password, accessLevel) {
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
                    password: password,
                    accessLevel: accessLevel
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }
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
                    schoolAddress: schoolAddress,
                    stateCode: stateCode,
                    questionLevel: questionLevel
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }
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