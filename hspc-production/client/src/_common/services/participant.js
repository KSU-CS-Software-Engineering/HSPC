import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/participant';

class participantService {
    constructor() {
        this.participant = null;
    }

    /*
    * Calls the API and registers a new Event object in the database.
    */
    addParticipant(TeamName, FirstName, LastName, SchoolName, StateCode, EventDate) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/admindash`,
                headers: {},
                json: true,
                body: {
                    TeamName: TeamName,
                    FirstName: FirstName,
                    LastName: LastName,
                    SchoolName: SchoolName,
                    StateCode: StateCode,
                    EventDate: EventDate
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }

    /*
    * Calls the API and returns a JSON list of all registered events.
    */
    getAllParticipants() {
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
                    this.events = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }
}

export default new participantService();