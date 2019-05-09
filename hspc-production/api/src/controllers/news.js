const router = require('express').Router();
const statusResponses = getHelper('status-response');
const newsService = getService('news');

/*
* API Endpoint that serves the creation of updates to be displayed on the homescreen.
*/
router.post('/create', (req, res) => {
    const articleTitle = req.body['articleTitle'];
    const articleSubHeading = req.body['articleSubHeading'];
    const articleMessage = req.body['articleBody'];
    const articleDate = req.body['articleDate'];

    if(articleTitle == '' || articleMessage == '' || articleDate == '') return statusResponses.badRequest(res, "Title, Message, and Date are required");
    newsService.createNews(articleTitle, articleSubHeading, articleMessage, articleDate)
        .then(() => {
            statusResponses.created(res, `Article Published Successfully!`);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

/*
* API Endpoint that returns stored updates from the database.
*/
router.get('/view', (req, res) => {
    newsService.getNewsHistory()
        .then((teamData) => {
            statusResponses.ok(res, teamData);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;