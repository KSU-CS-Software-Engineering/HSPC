import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/team';

class teamService {
    constructor() {
        this.teams = null;
    }

    /**************************************************************************************
     * Passes team information to the API and registers a new team object in the database.
     **************************************************************************************/
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

    /**************************************************************************************
     * Calls the API and returns a JSON list of all registered teams.
     **************************************************************************************/
    getAllTeams() {
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
                    this.teams = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }
}

export default new teamService();