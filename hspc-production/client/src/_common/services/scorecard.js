import * as request from 'request';
import axios from 'axios';

const controllerUrl = process.env.REACT_APP_API_URL + '/scorecard';

class scorecardService {
    constructor() {
        this.files = null;
    }

    /*
    * Calls the API and registers a new Event object in the database.
    */
    addScore(scorecard) {
        return new Promise((resolve, reject) => {
            let data = new FormData();
            data.append('scorecard', scorecard);
            axios.post(`${controllerUrl}/admindash`, data)
            .then((response)=>{
                resolve(response);
            })
            .catch(()=>{
                reject();
            })
        });
    }

    /*
    * Calls the API and returns a JSON list of all published scorecards.
    */
    getAllScores() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `${controllerUrl}/admindash`,
                headers: {}
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode !== 200)
                    return reject(err || response);
                if (response.statusCode === 200)
                    this.files = body; // saves the request response.
                resolve(response);
            });
        });
    }
}

export default new scorecardService();