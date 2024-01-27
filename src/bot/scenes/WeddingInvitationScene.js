const { Markup, Scenes } = require('telegraf');
const {
  SAKINAH_ACTION,
  MAWADAH_ACTION,
  MANUAL_INPUT,
  TEMPLATE_FORM,
  TEMPLATE_FORM_SAKINAH,
  WEDDING_INVITATION_SCENE_ID,
  CONFIRM_INVITATION_ACTION,
  CREATE_AGAIN_WITH_TEMPLATE,
  MUSIC_SCENE_ID,
} = require('../../utils/const');

const {createUndanganSakinahHandler, confirmUndanganSakinahHandler} = require('../../../controller/create_undangan_digital_sakinah');


const weddingInvitationScene = new Scenes.BaseScene(WEDDING_INVITATION_SCENE_ID);

weddingInvitationScene.enter((ctx) => {
    ctx.reply('Paket Apa Yang Akan Kamu Buat?', Markup.keyboard([[SAKINAH_ACTION, MAWADAH_ACTION]]));
});

weddingInvitationScene.on('text', async (ctx) => {
  const choice_lowercase = ctx.message.text.toLowerCase();
  const choice = ctx.message.text;
  
    switch (choice) {
      case SAKINAH_ACTION:
        ctx.session.data = { preferenceType: SAKINAH_ACTION };
        ctx.reply('Bagaimana Kamu Akan Memasukan Data?', Markup.keyboard([[MANUAL_INPUT, TEMPLATE_FORM]]));
        break;
  
      case MAWADAH_ACTION:
        ctx.reply('Coming soon');
        ctx.session.data = { preferenceType: MAWADAH_ACTION };
        scene.leave(); // exit global namespace
        break;
  
      case MANUAL_INPUT:
        ctx.session.data = { inputType: MANUAL_INPUT };
        ctx.reply('Manual Input Coming soon');
        break;
  
      case TEMPLATE_FORM:
        ctx.session.data = { inputType: TEMPLATE_FORM };
        ctx.reply(TEMPLATE_FORM_SAKINAH);
        ctx.reply('Silahkan Isi Berdasarkan Template Berikut', Markup.removeKeyboard());
        break;

        case CONFIRM_INVITATION_ACTION:
          ctx.scene.enter(MUSIC_SCENE_ID);
          break;
        case CREATE_AGAIN_WITH_TEMPLATE: 
            ctx.reply("Silahkan Kirimkan Kembali Form yang telah di revisi", Markup.removeKeyboard());
          break;
  
      default:
       const sakinah_condition = choice_lowercase.includes("paket sakinah");
        if(sakinah_condition && ctx.session.__scenes && ctx.session.__scenes.current === WEDDING_INVITATION_SCENE_ID && ctx.session.data.inputType === TEMPLATE_FORM ) {
            confirmUndanganSakinahHandler(ctx.message.chat.id,ctx.message.chat.username,ctx.message.text,ctx);
        } else {
            ctx.reply('Invalid choice. Please use the provided buttons.');
        }
    }


});

// weddingInvitationScene.leave((ctx) => { 
//   ctx.reply("Pilih Music");
// });

module.exports = weddingInvitationScene;