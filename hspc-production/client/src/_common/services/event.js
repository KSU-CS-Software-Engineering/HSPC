import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/event';

class eventService {
    constructor() {
        this.event = null;
    }

    /*
    * Calls the API and registers a new Event object in the database.
    */
    createEvent(eventLocation, eventDate, eventTime, eventDes) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/admindash`,
                headers: {},
                json: true,
                body: {
                    eventLocation: eventLocation,
                    eventDate: eventDate,
                    eventTime: eventTime,
                    eventDes: eventDes
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
    getAllEvents() {
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
                    this.events = body; // saves the request response.
                resolve(response);
            });
        });
    }
}

export default new eventService();