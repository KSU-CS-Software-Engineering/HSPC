const router = require('express').Router();
const statusResponses = getHelper('status-response');
const practiceService = getService('practice');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
}).single('practice');

router.post('/admindash', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            if (err.name === 'MulterError') {
                statusResponses.badRequest(res, err);
            }
            else {
                statusResponses.serverError(res);
            }
        }
        else if (req.file && req.file.buffer.byteLength > 0) {
            practiceService.addPractice(req.file)
                .then(() => {
                    statusResponses.created(res, `File Uploaded Successfully!`);
                })
                .catch((err) => {
                    statusResponses.serverError(res);
                });
        }
        else {
            statusResponses.badRequest(res, 'File Required');
        }
    });
});

router.get('/admindash', (req, res) => {
    practiceService.getAllScores()
        .then((scores) => {
            statusResponses.ok(res, scores);
        })
        .catch((err) => {
            statusResponses.serverError(res);
        });
});

module.exports = router;