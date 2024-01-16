const { getAxiosInstance } = require("../src/utils/axios");
const { errorHandler } = require("../src/utils/helper");
const axios = require('axios');

const MY_TOKEN = "6441533677:AAF3pEqjACs50ikwVIK3ceNBERhqMOEM3HI";
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);

async function createUndanganSakinahHandler(chatId, username, incomingMessages, ctx) {
  try {

    const messageLines = incomingMessages.split('\n');

        // Membuat objek untuk menyimpan variabel
        const dataUndangan = {};

        // Mengambil data dari setiap baris
        for (const line of messageLines) {
            const [label, value] = line.split(':');
            if (label && value) {
            // Menghapus spasi di awal dan akhir value
            const trimmedValue = value.trim();
            const key = label.trim().replace(/ /g, '_').toString().toLowerCase(); // Replace spaces with underscores in the label

            if (dataUndangan) {
                if (dataUndangan[key]) {
                dataUndangan[`${key}_wanita`] = trimmedValue;
                } else {
                dataUndangan[key] = trimmedValue;
                }
            }
            }

        }
        ctx.session.data.invitation = dataUndangan;
        await ctx.reply(`Mohon Tunggu Sedang Kami Proses\nMenginputkan Data Pengantin : loading"`);

        const apiUrl = 'http://visualkreatif.test/api/partner/create-undangan-sakinah-handler/'+username;

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        
        axios.post(apiUrl, dataUndangan, config)
          .then(async (response) => {
            // Tangani respons dari server di sini
            console.log("response dari server", response.data);
            let email = response.data.data.email;
            let password = response.data.data.password;
            let type = response.data.data.type;

            await ctx.reply(`Akun Berhasil Dibuat\nSilahkan login dengan credential berikut untuk melengkapi data\nemail:${email}\npassword:${password}\ntype:${type}`);
            
        })
        .catch(async (error) => {
            // Tangani kesalahan jika ada
            console.log(error);
            await ctx.reply(`Tidak dapat diproses, silahkan hubungi admin`);
          });

  } catch (error) {
    console.log("Error fetching welcome data:", error);
  }
}

module.exports = {
  createUndanganSakinahHandler,
};
