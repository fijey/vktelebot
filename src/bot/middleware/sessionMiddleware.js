const { Markup } = require("telegraf");
const { isSessionExpired, resetSession } = require("../../utils/session");

const isExpiredSessionMiddleware = (ctx, next) => {
    if (isSessionExpired(ctx.session)) {
        resetSession(ctx);
        ctx.reply('Session expired. Starting from the beginning. Please select command', Markup.removeKeyboard());
    } else {
        next();
    }
};

module.exports =  {
    isExpiredSessionMiddleware
}