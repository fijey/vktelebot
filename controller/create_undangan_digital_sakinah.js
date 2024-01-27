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

async function confirmUndanganSakinahHandler(chatId, username, incomingMessages, ctx) {
  try {

    const messageLines = incomingMessages.split('\n');

    // Membuat objek untuk menyimpan variabel
    const dataUndangan = {};

    // Mengambil data dari setiap baris
    for (const line of messageLines) {
      const [label, value] = line.split('=>');
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
    const invitationData = ctx.session.data.invitation;
    await ctx.reply(`
KONFIRMASI DATA UNDANGAN
Harap periksa dengan teliti data-data yang kamu masukan dibawah, silahkan konfirmasi jika sudah sesuai.

Link yang akan digunakan : ${invitationData.link_yang_akan_digunakan}
Email : ${invitationData.email}
Phone : ${invitationData.phone}
Subdomain : ${invitationData.subdomain}

Data Pengantin Pria
Nama Lengkap : ${invitationData.nama_lengkap}
Nama Panggilan : ${invitationData.nama_panggilan}
Nama Ayah : ${invitationData.nama_ayah}
Nama Ibu : ${invitationData.nama_ibu}
Intagram : ${invitationData.instagram_pria}
Facebook : ${invitationData.facebook_pria}
Twitter : ${invitationData.twitter_pria}

Data Pengantin Wanita
Nama Lengkap : ${invitationData.nama_lengkap_wanita}
Nama Panggilan : ${invitationData.nama_panggilan_wanita}
Nama Ayah : ${invitationData.nama_ayah_wanita}
Nama Ibu : ${invitationData.nama_ibu_wanita}
Intagram : ${invitationData.instagram_wanita}
Facebook : ${invitationData.facebook_wanita}
Twitter : ${invitationData.twitter_wanita}

Data Akad
Tanggal: ${invitationData.tanggal_akad}
Dilaksanakan Pada: ${invitationData.jam_mulai_akad} - ${invitationData.jam_selesai_akad} ${invitationData.zona_waktu_akad}
Lokasi: ${invitationData.lokasi_akad}
Google Maps Akad: ${invitationData.google_maps_akad}

Data Resepsi
Tanggal: ${invitationData.tanggal_resepsi}
Dilaksanakan Pada: ${invitationData.jam_mulai_resepsi} - ${invitationData.jam_selesai_resepsi} ${invitationData.zona_waktu_resepsi}
Lokasi: ${invitationData.lokasi_resepsi}
Google Maps Resepsi: ${invitationData.google_maps_resepsi}

`, Markup.keyboard([[CONFIRM_INVITATION_ACTION, CREATE_AGAIN_WITH_TEMPLATE]]));

  } catch (error) {
    console.log("Error fetching welcome data:", error);
  }
}

async function createUndanganSakinahHandler(chatId, username, incomingMessages, ctx) {
  try {
    const dataUndangan = ctx.session.data.invitation;
    const apiUrl = 'http://visualkreatif.test/api/partner/create-undangan-sakinah-handler/' + username;

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
  confirmUndanganSakinahHandler
};
