const { Markup, Scenes } = require('telegraf');
const { MUSIC_SCENE_ID } = require('../../utils/const');
const MusicController = require('../../../controller/MusicController');
const WeddingInvitationController = require('../../../controller/WeddingInvitationController');

const musicScene = new Scenes.BaseScene(MUSIC_SCENE_ID);

musicScene.enter(async (ctx) => {
	await ctx.reply('Pilih Background Music', Markup.keyboard([
		['Lihat Daftar Musik'],
		['Cari Musik'],
		['Kembali'],
	]));
});

musicScene.hears('Lihat Daftar Musik', async (ctx) => {
	await MusicController.getListMusic(ctx);
});

musicScene.hears('Cari Musik', async (ctx) => {
	await ctx.reply('Masukkan nama musik yang ingin Anda cari:');
	ctx.scene.state.awaitingSearch = true;
});

musicScene.hears('Kembali', async (ctx) => {
	ctx.scene.leave();
});

musicScene.action(/music_\d+/, async (ctx) => {
	console.log('musicScene.action called with ctx:', ctx.match);
	await MusicController.handleMusicSelection(ctx);
});

musicScene.action(/page_\d+/, async (ctx) => {
	const page = parseInt(ctx.match[0].split('_')[1]);
	await MusicController.getListMusic(ctx, page);
});

musicScene.on('text', async (ctx) => {
	if (ctx.scene.state.awaitingSearch) {
		await MusicController.handleSearch(ctx);
		ctx.scene.state.awaitingSearch = false;
	} else {
		const choice = ctx.message.text;
		switch (choice) {
		case 'YA':
			await ctx.reply('Mohon Tunggu Sedang Kami Proses\nMenginputkan Data Pengantin : loading', Markup.removeKeyboard());
			await WeddingInvitationController.createUndanganSakinah(ctx);
			break;
		case 'TIDAK':
			await MusicController.getListMusic(ctx);
			break;
		default:
			await ctx.reply('Pilihan tidak valid. Silakan gunakan tombol yang disediakan.');
		}
	}
});

module.exports = musicScene;
