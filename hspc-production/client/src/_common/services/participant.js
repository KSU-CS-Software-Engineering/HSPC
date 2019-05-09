import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/participant';

/*
* @author: Daniel Bell
*/
class participantService {
    constructor() {
        this.participant = null;
    }

    /*
    * Calls the API and registers a new Event object in the database.
    *
    * @param {string} text value of the team name the participant is being added to
    * @param {string} text value of the participant's school
    * @param {string} two character code representing the prticipant's home state
    * @param {string} text value representing the experience level of the participant
    * @param {string} stringified value of the date of the event that the participant is registering for
    */
    addParticipant(TeamName, SchoolName, StateCode, QuestionLevel, EventDate) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/create`,
                headers: {},
                json: true,
                body: {
                    TeamName: TeamName,
                    SchoolName: SchoolName,
                    StateCode: StateCode,
                    EventDate: EventDate,
                    QuestionLevel: QuestionLevel
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
                url: `${controllerUrl}/view`,
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