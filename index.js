const { Telegraf, Scenes, session, Markup } = require('telegraf');
const weddingInvitationScene = require('./src/bot/scenes/WeddingInvitationScene');
const { isSessionExpired, resetSession } = require('./src/utils/session');
const { WEDDING_INVITATION_SCENE_ID, MUSIC_SCENE_ID } = require('./src/utils/const');
const musicScene = require('./src/bot/scenes/MusicScene');
const MY_TOKEN = "6441533677:AAF3pEqjACs50ikwVIK3ceNBERhqMOEM3HI";

const bot = new Telegraf(MY_TOKEN, { polling: { port: 8080 } });
const stage = new Scenes.Stage([weddingInvitationScene, musicScene]);

const isExpiredSessionMiddleware = (ctx, next) => {
    if (isSessionExpired(ctx.session)) {
        resetSession(ctx);
        ctx.reply('Session expired. Starting from the beginning. Please select command', Markup.removeKeyboard());
    } else {
        next();
    }
};

bot.use(session());
// Middleware to set default session structure
bot.use((ctx, next) => {
    // Ensure ctx.session is defined
    ctx.session = ctx.session || {};

    // Check if ctx.session.data is undefined or null
    if (!ctx.session.data) {
        // Set default structure
        ctx.session.data = {
            preferenceType: null,
            inputType: null,
        };
        ctx.session.startTime = Date.now();
        ctx.session.__scenes = {current: '',state: {}}
        // Additional logic to set other default session data if needed
    }

    // Call the next middleware or handler
    return next();
});
bot.use(isExpiredSessionMiddleware);
bot.use(stage.middleware());

bot.start((ctx) => {
    ctx.reply('Welcome!'); // Handle start command or initial message
});

bot.on('text', (ctx) => {
    const messageText = ctx.message.text.toLowerCase();
    if (messageText === '/create_wedding_invitation') {
        ctx.scene.enter(WEDDING_INVITATION_SCENE_ID);
    }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
