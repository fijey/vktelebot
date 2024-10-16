const WeddingInvitationService  = require('../src/bot/services/weddingInvitationService');
const { Markup } = require('telegraf');
const { CONFIRM_INVITATION_ACTION, CREATE_AGAIN_WITH_TEMPLATE } = require('../src/utils/const');

class WeddingInvitationController {
  async confirmUndanganSakinah(ctx) {
    try {
      const incomingMessages = ctx.message.text;
      const dataUndangan = await WeddingInvitationService.parseIncomingMessages(incomingMessages);
      ctx.session.data.invitation = dataUndangan;

      const confirmationMessage = await WeddingInvitationService.createConfirmationMessage(dataUndangan);
      await ctx.reply(confirmationMessage, Markup.keyboard([[CONFIRM_INVITATION_ACTION, CREATE_AGAIN_WITH_TEMPLATE]]));
    } catch (error) {
      console.error("Error dalam memproses data undangan:", error);
      ctx.reply('Terjadi kesalahan saat memproses data undangan. Silakan coba lagi.');
    }
  }

  async createUndanganSakinah(ctx) {
      const username = ctx.message.chat.username;
      const dataUndangan = ctx.session.data.invitation;
      
      const response = await WeddingInvitationService.createInvitation(username, dataUndangan);
      
      if (response?.data?.status === 'error') {
        await this.handleErrorResponse({ response: { data: response } }, ctx);
      } else {
        await this.handleSuccessResponse(response, ctx);
      }
  }

  async handleSuccessResponse(response, ctx) {
    const { email, password, type } = response.data.data;
    const message = `Akun Berhasil Dibuat\nSilahkan login dengan credential berikut untuk melengkapi data\nemail:${email}\npassword:${password}\ntype:${type}`;
    await ctx.reply(message);
  }

  async handleErrorResponse(error, ctx) {
    let errorMessage = 'Terjadi kesalahan saat membuat akun. Silakan coba lagi.';

    if (error.response && error.response.data) {
      const { status, message } = error.response.data.data;
      if (status === 'error' && message) {
        errorMessage = message;
      }
    }

    await ctx.reply(errorMessage);
  }
}

module.exports = new WeddingInvitationController();
