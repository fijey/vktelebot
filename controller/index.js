const { handleMessage, sendMessage } = require("./lib/telegram");
const { errorHandler } = require("./lib/helper");

async function handler(req, method) {
    try {
        if (method === "GET") {
            return "Hello Get";
        }

        const { body } = req;

        if (body && body.message) {
            const messageObj = body.message;
            await handleMessage(messageObj);

            return "Success";
        }

        return "Unkown Request";
    } catch (error) {
        errorHandler(error, "Main index handler");
    }
}

module.exports = { handler }