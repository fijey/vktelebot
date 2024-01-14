const { getAxiosInstance } = require("./axios");
const { errorHandler } = require("./helper");
const { createUndanganSakinahHandler } = require('../create_undangan_digital_sakinah');

const { Telegraf, Markup, Scenes, session } = require('telegraf')
const { message } = require('telegraf/filters')

const MY_TOKEN = "6441533677:AAF3pEqjACs50ikwVIK3ceNBERhqMOEM3HI";
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);

const THEATER_ACTION = 'theater';
const MOVIE_ACTION = 'movie';

function sendMessage(chatId, messageText) {
    return axiosInstance.get("sendMessage", {
        chat_id: chatId,
        text: messageText,
    }).catch((ex)=> {
        errorHandler(ex, "sendMessage", "axios");
    })
}

async function handleMessage(messageObj) {
    const bot = new Telegraf(MY_TOKEN);
    const messageText = String(messageObj.text.toLocaleLowerCase()) || "";

    if (!messageText) {
        errorHandler("no Message Text", "handleMessage");
        return "";
    }

    try {
        const chatId = messageObj.chat.id;
        const username = messageObj.from.username;


        //scenes
        const screnario_1 = new Scenes.BaseScene('SCENARIO_1');

        screnario_1.enter((ctx) => {
            ctx.session.myData = {};
            ctx.reply('What Do You Like?', Markup.inlineKeyboard([
              Markup.callbackButton('Movie', MOVIE_ACTION),
              Markup.callbackButton('Theater', THEATER_ACTION),
            ]).extra());
        });
        screnario_1.action(THEATER_ACTION, (ctx) => {
            ctx.reply('You choose theater');
            ctx.session.myData.preferenceType = 'Theater';
            return ctx.scene.enter('SOME_OTHER_SCENE_ID'); // switch to some other scene
        });
        
        screnario_1.action(MOVIE_ACTION, (ctx) => {
            ctx.reply('You choose movie, your loss');
            ctx.session.myData.preferenceType = 'Movie';
            return ctx.scene.leave(); // exit global namespace
        });

        screnario_1.leave((ctx) => {
            ctx.reply('Thank you for your time!');
        });
        
        // What to do if user entered a raw message or picked some other option?
        screnario_1.use((ctx) => ctx.replyWithMarkdown('Please choose either Movie or Theater'));

        bot.hears('hi fajar', (ctx) => ctx.scene.enter('SCENARIO_1'));
        // bot.hears('hi fajar', (ctx) => ctx.reply('One Hi', Markup.keyboard([['1', '2', '3']])));
        // bot.hears('1', (ctx) => ctx.reply('remove', Markup.removeKeyboard()));

        bot.launch();
        // if (messageText.charAt(0) === "/") {
        //     const command = messageText.substr(1);

        //     switch (command) {
        //         case "start":
        //             const opts = {
        //                 reply_markup: JSON.stringify({
        //                   keyboard: [
        //                     ['Yes, you are the bot of my life ❤'],
        //                     ['No, sorry there is another one...']
        //                   ]
        //                 })
        //               };
        //             return sendMessage(chatId, "Halo Partner Visual Kreatif",opts);
        //             break;
            
        //         case "buat_undangan_wedding":
        //             return sendMessage(chatId, `Halo ${username} silahkan kirim format pemesanannya`);
        //             break;
            
        //         default:
        //             return sendMessage(chatId, "No Ini Bukan Bagian dari Partner VisualKreatif");
        //             break;
        //     }
        // }

        // console.log(messageText);
        // console.log(messageText.includes('form data undangan paket sakinah'));
        // if(messageText.includes('form data undangan paket sakinah')){
        //     console.log(true);
        //     await createUndanganSakinahHandler(chatId, username, messageText);
        // }
        process.once("SIGINT", () => bot.stop("SIGINT"));
        process.once("SIGTERM", () => bot.stop("SIGTERM"));
    } catch (error) {
        errorHandler(error, "handleMessage");
    }
}

module.exports = { sendMessage, handleMessage }