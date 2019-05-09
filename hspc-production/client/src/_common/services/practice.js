import * as request from 'request';
import axios from 'axios';

const controllerUrl = process.env.REACT_APP_API_URL + '/practice';

/*
* @author: Daniel Bell
*/
class practiceService {
    constructor() {
        this.files = null;
    }

    /*
    * Calls the API and adds a new file of practice problems into the database.
    * @param {file} multipart data from the uploaded practice problem file
    */
    addPractice(practice) {
        return new Promise((resolve, reject) => {
            let data = new FormData();
            data.append('practice', practice);
            axios.post(`${controllerUrl}/create`, data)
                .then((response) => {
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        this.files = response; // saves the response.
                    }
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /*
    * Calls the API and returns a JSON list of all published practice problems.
    */
    getAllPractice() {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                url: `${controllerUrl}/view`,
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

export default new practiceService();