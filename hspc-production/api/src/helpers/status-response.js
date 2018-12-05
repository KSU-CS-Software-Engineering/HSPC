module.exports = {
    badRequest: (res, content) => {
        sendResponse(res, content, 400);
    },
    created: (res, content) => {
        sendResponse(res, content, 201);
    },
    conflict: (res, content) => {
        sendResponse(res, content, 409);
    },
    notFound: (res, content) => {
        sendResponse(res, content, 404);
    },
    ok: (res, content) => {
        sendResponse(res, content, 200);
    },
    serverError: (res, content) => {
        sendResponse(res, content, 500);
    },
    unauthorized: (res, content) => {
        sendResponse(res, content, 401);
    }
};

function sendResponse(res, content, statusCode) {
    content = parseContent(content);
    res.status(statusCode).send(content);
}

function parseContent(content) {
    if (typeof content === 'string') {
        content = {
            message: content
        }
    }
    return content;
}