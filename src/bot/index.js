const { Telegraf, Scenes, session } = require('telegraf');
const weddingInvitationScene = require('./scenes/WeddingInvitationScene');
const { isSessionExpired, resetSession } = require('../utils/session');
const {MY_TOKEN, WEDDING_INVITATION_SCENE_ID, TEMPLATE_FORM} = require('../utils/const');

const bot = new Telegraf(MY_TOKEN);
const stage = new Scenes.Stage([weddingInvitationScene]);

bot.use(session());
bot.use(stage.middleware());

bot.on('text', (ctx) => {
    if (isSessionExpired(ctx.session)) {
        // Reset session if it has expired
        resetSession(ctx);
        ctx.reply('Session expired. Starting from the beginning. please select command');
    } else {
        if (!ctx.session.data) {
            ctx.session.data = {
                preferenceType: null,
                inputType: null,
            };
            ctx.session.startTime = Date.now();
        }
        const messageText = ctx.message.text.toLowerCase();
        if (messageText === '/create_wedding_invitation') {
            ctx.scene.enter('CREATE_WEDDING_INVITATION');
        }
    }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
