const { Markup, Scenes } = require('telegraf');
const {
  MAWADAH_ACTION,
  MANUAL_INPUT,
  TEMPLATE_FORM,
  TEMPLATE_FORM_SAKINAH,
  WEDDING_INVITATION_SCENE_ID,
  CONFIRM_INVITATION_ACTION,
  CREATE_AGAIN_WITH_TEMPLATE,
  MUSIC_SCENE_ID,
} = require('../../utils/const');

const {
  confirmUndanganSakinahHandler
} = require('../../../controller/create_undangan_digital_sakinah');

const weddingInvitationScene = new Scenes.BaseScene(WEDDING_INVITATION_SCENE_ID);

weddingInvitationScene.enter((ctx) => {
  // ctx.session.data = { preferenceType: MAWADA H_ACTION };
  // ctx.reply('Bagaimana Kamu Akan Memasukan Data?', 
  //   Markup.keyboard([[MANUAL_INPUT, TEMPLATE_FORM]])
  // );

  handleTemplateForm(ctx);
});

weddingInvitationScene.on('text', async (ctx) => {
  const choice = ctx.message.text;
  const choiceLowercase = choice.toLowerCase();
  
  const actions = {
    [MANUAL_INPUT]: handleManualInput,
    [TEMPLATE_FORM]: handleTemplateForm,
    [CONFIRM_INVITATION_ACTION]: handleConfirmInvitation,
    [CREATE_AGAIN_WITH_TEMPLATE]: handleCreateAgain,
  };

  const handler = actions[choice];
  if (handler) {
    handler(ctx);
  } else {
    handleDefaultCase(ctx, choiceLowercase);
  }
});

// ... fungsi-fungsi handler ...

function handleManualInput(ctx) {
  ctx.session.data = { inputType: MANUAL_INPUT };
  ctx.reply('Manual Input Coming soon');
}

function handleTemplateForm(ctx) {
  ctx.session.data = { inputType: TEMPLATE_FORM };
  ctx.reply(TEMPLATE_FORM_SAKINAH);
  ctx.reply('Silahkan Isi Berdasarkan Template Berikut', Markup.removeKeyboard());
}

function handleConfirmInvitation(ctx) {
  ctx.scene.enter(MUSIC_SCENE_ID);
}

function handleCreateAgain(ctx) {
  ctx.reply("Silahkan Kirimkan Kembali Form yang telah di revisi", Markup.removeKeyboard());
}

function handleDefaultCase(ctx, choiceLowercase) {
  const isMawadahCondition = ctx.session.__scenes?.current === WEDDING_INVITATION_SCENE_ID &&
    ctx.session.data?.inputType === TEMPLATE_FORM;

  if (isMawadahCondition) {
    confirmUndanganSakinahHandler(ctx.message.chat.id, ctx.message.chat.username, ctx.message.text, ctx);
  } else {
    ctx.reply('Pilihan tidak valid. Silakan gunakan tombol yang disediakan.');
  }
}

module.exports = weddingInvitationScene;