const {
  CONFIRM_INVITATION_ACTION,
  CREATE_AGAIN_WITH_TEMPLATE
} = require('../src/utils/const');
const { Markup } = require("telegraf");
const axios = require('axios'); 

async function getListMusicHandler(username, ctx) {
let listMusic = [];
  try {
    const apiUrl = 'http://visualkreatif.test/api/partner/get-list-music/' + username;
    const dataUndangan = [];

    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      await axios.post(apiUrl, dataUndangan, config)
        .then(async (response) => {
          // Tangani respons dari server di sini
          listMusic = response.data.data;
  
        })
        .catch(async (error) => {
          // Tangani kesalahan jika ada
          console.log(error);
          await ctx.reply(`Tidak dapat diproses, silahkan hubungi admin`);
        });
        

  } catch (error) {
    console.log("Error fetching welcome data:", error);
  }

  return listMusic;
}

module.exports = {
  getListMusicHandler
};
