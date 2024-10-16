const { Markup, Scenes } = require('telegraf');
const {
  SAKINAH_ACTION,
  MAWADAH_ACTION,
  MUSIC_SCENE_ID
} = require('../../utils/const');

const { getListMusicHandler } = require('../../../controller/music_controller');
const WeddingInvitationController = require('../../../controller/WeddingInvitationController');


const musicScene = new Scenes.BaseScene(MUSIC_SCENE_ID);
let listMusic = [];
let inlineKeyboard = [];

musicScene.enter(async (ctx) => {
  ctx.reply('Pilih Background Music', Markup.removeKeyboard());
  listMusic = await getListMusicHandler(ctx.message.chat.username, ctx);

  inlineKeyboard = Markup.inlineKeyboard(
    listMusic.map((music, index) => [
      Markup.button.callback(music.name, `${index}`)
    ])
  );

  // Menanggapi aksi dari tombol inline berdasarkan indeks
  listMusic.forEach((music, index) => {
    musicScene.action(`${index}`, (ctx) => {
      ctx.session.data.invitation.lagu_yang_di_inginkan = music.name;
      ctx.session.data.invitation.id_musik = music.id;
      ctx.reply(`Pilih Musik ${music.name}?`, Markup.keyboard(['YA', 'TIDAK']));
    });
  });

  ctx.reply('<b>List Musik yang dapat kamu pilih:</b>', {
    parse_mode: 'HTML',
    ...inlineKeyboard,
  }, Markup.removeKeyboard());
});

musicScene.on('text', async (ctx) => {
  const choice = ctx.message.text;
  switch (choice) {
    case 'YA':
      const username = ctx.message.chat.username;
      ctx.reply(`Mohon Tunggu Sedang Kami Proses\nMenginputkan Data Pengantin : loading"`, Markup.removeKeyboard());
      await WeddingInvitationController.createUndanganSakinah(ctx);
      break;
    case 'TIDAK':
      ctx.reply('<b>Pilih Background Musik terlebih dahulu:</b>', {
        parse_mode: 'HTML',
        ...inlineKeyboard,
      });

    default:

  }
});


// weddingInvitationScene.action('btn-1', (ctx) => { 
//   ctx.reply("OKEEEYY");
// });


// weddingInvitationScene.leave(({ reply }) => {
//   reply('Thank you for your time!');
// });

module.exports = musicScene;
