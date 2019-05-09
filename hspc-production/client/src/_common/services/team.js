import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/team';

/*
* @author: Daniel Bell
*/
class teamService {
    constructor() {
        this.teams = null;
    }

    /*
    * Passes team information to the API and registers a new team object in the database.
    * @param {string} text value of the new team's name
    * @param {string} text value of the school the new team is representing
    * @param {string} text value of the inputted school's address
    * @param {string} text value representing the experience level of the new team
    * @param {string} text value of the name of the new team's advisor
    * @param {string} text value of the new team's advisor's email address
    */
    registerTeam(teamName, schoolName, schoolAddress, stateCode, questionLevel, advisor, advisorEmail) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/create`,
                headers: {},
                json: true,
                body: {
                    teamName: teamName,
                    schoolName: schoolName,
                    schoolAddress: schoolAddress,
                    stateCode: stateCode,
                    questionLevel: questionLevel,
                    advisor: advisor,
                    advisorEmail: advisorEmail
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }

    /*
    * Calls the API and returns a JSON list of all registered teams.
    */
    getAllTeams() {
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
                    this.teams = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }
}

export default new teamService();