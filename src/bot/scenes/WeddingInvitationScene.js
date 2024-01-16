const { Markup, Scenes } = require('telegraf');
const { isSessionExpired, resetSession } = require('../../utils/session');
const {
  SAKINAH_ACTION,
  MAWADAH_ACTION,
  MANUAL_INPUT,
  TEMPLATE_FORM,
  TEMPLATE_FORM_SAKINAH,
  WEDDING_INVITATION_SCENE_ID
} = require('../../utils/const');

const {createUndanganSakinahHandler} = require('../../../controller/create_undangan_digital_sakinah');


const weddingInvitationScene = new Scenes.BaseScene(WEDDING_INVITATION_SCENE_ID);

weddingInvitationScene.enter((ctx) => {
    ctx.reply('Paket Apa Yang Akan Kamu Buat?', Markup.keyboard([[SAKINAH_ACTION, MAWADAH_ACTION]]));
});

weddingInvitationScene.on('text', (ctx) => {
    const choice = ctx.message.text.toLowerCase();
  
    switch (choice) {
      case SAKINAH_ACTION:
        if (isSessionExpired(ctx.session)) {
          resetSession(ctx.session);
          return;
        }
        ctx.reply('Bagaimana Kamu Akan Memasukan Data?', Markup.keyboard([[MANUAL_INPUT, TEMPLATE_FORM]]));
        break;
  
      case MAWADAH_ACTION:
        ctx.reply('You choose mawadah, your loss');
        ctx.session.data = { preferenceType: MAWADAH_ACTION };
        scene.leave(); // exit global namespace
        break;
  
      case MANUAL_INPUT:
        ctx.session.data = { inputType: MANUAL_INPUT };
        ctx.reply('Manual Input');
        break;
  
      case TEMPLATE_FORM:
        ctx.session.data = { inputType: TEMPLATE_FORM };
        ctx.reply(TEMPLATE_FORM_SAKINAH);
        ctx.reply('Silahkan Isi Berdasarkan Template Berikut', Markup.removeKeyboard());
        break;
  
      default:
       const sakinah_condition = choice.includes("paket sakinah");
        if(sakinah_condition && ctx.session.__scenes && ctx.session.__scenes.current === WEDDING_INVITATION_SCENE_ID && ctx.session.data.inputType === TEMPLATE_FORM ) {
            ctx.reply('Memproses Data');
            createUndanganSakinahHandler(ctx.message.chat.id,ctx.message.chat.username,ctx.message.text,ctx);
        } else {
            ctx.reply('Invalid choice. Please use the provided buttons.');
        }
    }


  });
  

weddingInvitationScene.leave(({ reply }) => {
  reply('Thank you for your time!');
});

module.exports = weddingInvitationScene;