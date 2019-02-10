import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/team';

class teamService {
    constructor() {
        this.teams = null;
    }

    /*
     * SUSPECT
     * Returns a list of created teams.
     */
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