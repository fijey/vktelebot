function errorHandler(error, name, from) {
    let loggerFunctions = console.log;
    console.log(error);

    loggerFunctions("----------START---------");
    loggerFunctions("error occured in " + name);

    if (from == "axios") {
        if (error.response) {
            loggerFunctions(error.data);
            loggerFunctions(error.status);
            loggerFunctions(error.headers);
        } else if (error.request) {
            loggerFunctions("error.request");
        } else {
            loggerFunctions("Error", error.message);
        }
        loggerFunctions(error);
    } else {
        loggerFunctions(error);
    }

    loggerFunctions("----------END---------");
}

module.exports = {
    errorHandler,
}