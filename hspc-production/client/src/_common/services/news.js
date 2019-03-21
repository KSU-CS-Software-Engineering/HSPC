import * as request from 'request';

const controllerUrl = process.env.REACT_APP_API_URL + '/news';

class NewsService {
    constructor() {
        this.news = null;
    }

    /*
    * Creates a new newsletter article.
    */
    createNews(articleTitle, articleSubHeading, articleBody, articleDate) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `${controllerUrl}/admindash`,
                headers: {},
                json: true,
                body: {
                    articleTitle: articleTitle,
                    articleSubHeading: articleSubHeading, 
                    articleBody: articleBody,
                    articleDate: articleDate
                }
            }
            request(options, (err, response, body) => {
                if (err || response.statusCode >= 500) return reject(err || response);
                resolve(response);
            });
        });
    }

    /*
    * Returns all news events in chronological order
    */
    getNewsHistory() {
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
                    this.news = body; // saves the request response.
                }
                resolve(response);
            });
        });
    }
}

export default new NewsService();