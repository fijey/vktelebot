const MusicService = require('../src/bot/services/musicService');
const { Markup } = require('telegraf');

class MusicController {
  async getListMusic(ctx, page = 1) {
    try {
      const username = ctx.message?.chat.username || ctx.callbackQuery.message.chat.username;
      const { music, currentPage, totalPages, hasNextPage, hasPrevPage } = await MusicService.getListMusicPaginated(username, page);
      
      const inlineKeyboard = [
        ...music.map((music, index) => [
          Markup.button.callback(music.name, `music_${music.id}`)
        ]),
        []
      ];

      if (hasPrevPage) {
        inlineKeyboard[inlineKeyboard.length - 1].push(Markup.button.callback('⬅️ Prev', `page_${currentPage - 1}`));
      }
      if (hasNextPage) {
        inlineKeyboard[inlineKeyboard.length - 1].push(Markup.button.callback('Next ➡️', `page_${currentPage + 1}`));
      }

      const message = `<b>Daftar Musik (Halaman ${currentPage}/${totalPages}):</b>`;
      if (ctx.callbackQuery) {
        await ctx.editMessageText(message, {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard(inlineKeyboard)
        });
      } else {
        await ctx.reply(message, {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard(inlineKeyboard)
        });
      }

      return music;
    } catch (error) {
      console.error('Error in getListMusic:', error);
      await ctx.reply('Terjadi kesalahan saat mengambil daftar musik. Silakan coba lagi nanti.');
    }
  }

  async handleMusicSelection(ctx) {
    const musicId = ctx.match[0].split('_')[1];
    const username = ctx.callbackQuery.from.username;
    const selectedMusic = await MusicService.getMusicById(username, musicId);

    console.log('musicId', musicId);
    console.log('username', username);
    console.log('selectedMusic', selectedMusic);

    if (!selectedMusic) {
      await ctx.answerCbQuery('Musik tidak ditemukan');
      return;
    }

    ctx.session.data.invitation.lagu_yang_di_inginkan = selectedMusic.name;
    ctx.session.data.invitation.id_musik = selectedMusic.id;
    
    await ctx.answerCbQuery();
    await ctx.reply(`Pilih Musik ${selectedMusic.name}?`, Markup.keyboard(['YA', 'TIDAK']));
  }

  async handleSearch(ctx) {
    const query = ctx.message.text;
    const username = ctx.message.chat.username;
    const searchResults = await MusicService.searchMusic(username, query);

    if (searchResults.length === 0) {
      await ctx.reply('Tidak ada musik yang cocok dengan pencarian Anda.');
      return;
    }

    const inlineKeyboard = searchResults.map((music) => [
      Markup.button.callback(music.name, `music_${music.id}`)
    ]);

    await ctx.reply('Hasil pencarian:', Markup.inlineKeyboard(inlineKeyboard));
  }
}

module.exports = new MusicController();
