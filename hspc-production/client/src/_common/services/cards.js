import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/cards';

class cardService {
    constructor() {
        this.cards = null;
    }

    /*
    * Calls the API and inserts a pdf in the database.
    */
    createCards(file) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/admindash`,
                headers: {},
                json: true,
                body: { fileName: file }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }

    /*
    * Calls the API and returns a JSON list of all pdfs.
    */
    getAllCards() {
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
                    this.cards = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }
}

export default new cardService();