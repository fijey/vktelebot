const { getAxiosInstance } = require("../src/utils/axios");
const { errorHandler } = require("../src/utils/helper");
const axios = require('axios');

const MY_TOKEN = "6441533677:AAF3pEqjACs50ikwVIK3ceNBERhqMOEM3HI";
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);

const {
  CONFIRM_INVITATION_ACTION,
  CREATE_AGAIN_WITH_TEMPLATE
} = require('../src/utils/const');
const { Markup } = require("telegraf");

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
