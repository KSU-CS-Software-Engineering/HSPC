import request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/user';

class userService {
    constructor() {
        this.users = null;
    }

    // fix - return all active users
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
                    
                    this.users = body; // sets request response to users
                
                }
                resolve(response);
            });
        });
    }
}

export default new userService();