import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/user';

class userService {
    constructor() {
        this.users = null;
        this.teams = null;
    }

    /*
    * Returns an array of all registered users.
    */
    getAllUsers(){
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `${controllerUrl}/admindash`,
                headers: {}
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode !== 200) 
                    return reject(err || response);
                if (response.statusCode === 200){
                    this.users = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }

    /*
    * Returns a list of advisor created teams.
    */
    getAllTeams(){
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `${controllerUrl}/advisordash`,
                headers: {}
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode !== 200) 
                    return reject(err || response);
                if (response.statusCode === 200){
                    this.users = body; // saves the request response.
                }
                resolve(response);
            });
        });        
    }

    /*
    * Creates a team from selected users.
    */
    createTeam(){
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/advisordash`,
                headers: {},
                json: true,
                body: {

                    // search data.

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