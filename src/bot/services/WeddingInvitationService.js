const axios = require('axios');

class WeddingInvitationService {
  constructor() {
    this.apiBaseUrl = process.env.API_BASE_URL;
  }

async parseIncomingMessages(incomingMessages) {
    const messageLines = incomingMessages.split('\n');
    const dataUndangan = {};
    let currentSection = '';

    for (const line of messageLines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('Data Diri Mempelai')) {
        currentSection = trimmedLine.includes('Pria') ? 'pria' : 'wanita';
        continue;
    }

    if (trimmedLine.startsWith('Detail Acara')) {
        currentSection = trimmedLine.includes('Akad') ? 'akad' : 'resepsi';
        continue;
    }

    const [label, value] = trimmedLine.split('=>').map(item => item.trim());
    if (label && value) {
        let key = label.replace(/ /g, '_').toLowerCase();

        if (currentSection) {
        key = `${key}_${currentSection}`;
        }

        dataUndangan[key] = value;
    }
    }

    return this.setDefaultValues(dataUndangan);
}

async setDefaultValues(dataUndangan) {
    const defaultFields = [
        'email', 'phone', 'subdomain', 'link_anda',
        'nama_lengkap_pria', 'nama_panggilan_pria', 'nama_ayah_pria', 'nama_ibu_pria',
        'instagram_pria', 'facebook_pria', 'twitter_pria',
        'nama_lengkap_wanita', 'nama_panggilan_wanita', 'nama_ayah_wanita', 'nama_ibu_wanita',
        'instagram_wanita', 'facebook_wanita', 'twitter_wanita',
        'tanggal_akad', 'jam_mulai_akad', 'jam_selesai_akad', 'lokasi_akad', 'google_maps_akad', 'zona_waktu_akad',
        'tanggal_resepsi', 'jam_mulai_resepsi', 'jam_selesai_resepsi', 'lokasi_resepsi', 'google_maps_resepsi', 'zona_waktu_resepsi'
        ];

        defaultFields.forEach(field => {
        if (!dataUndangan[field]) {
            dataUndangan[field] = 'Tidak diisi';
        }
        });

        return dataUndangan;
}

  async createInvitation(username, dataUndangan) {
    const apiUrl = `${this.apiBaseUrl}/partner/create-undangan-sakinah-handler/${username}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(apiUrl, dataUndangan, config);
      return response.data;
    } catch (error) {
      console.log('error create invitation', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        // Jika ada respons error dari server, kembalikan data tersebut
        return error.response.data;
      } else {
        // Jika tidak ada respons spesifik, lempar error umum
        throw new Error('Failed to create invitation');
      }
    }
  }

  async getListMusic(username) {
    const apiUrl = `${this.apiBaseUrl}/partner/get-list-music/${username}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(apiUrl, {}, config);
      return response.data.data;
    } catch (error) {
      throw new Error('Failed to fetch music list');
    }
  }

  async createConfirmationMessage(invitationData) {
    return `
KONFIRMASI DATA UNDANGAN
Harap periksa dengan teliti data-data yang kamu masukan dibawah, silahkan konfirmasi jika sudah sesuai.

Email : ${invitationData.email}
Phone : ${invitationData.phone}
Subdomain : ${invitationData.subdomain}

Data Pengantin Pria
Nama Lengkap : ${invitationData.nama_lengkap_pria}
Nama Panggilan : ${invitationData.nama_panggilan_pria}
Nama Ayah : ${invitationData.nama_ayah_pria}
Nama Ibu : ${invitationData.nama_ibu_pria}
Instagram : ${invitationData.instagram_pria}
Facebook : ${invitationData.facebook_pria}
Twitter : ${invitationData.twitter_pria}

Data Pengantin Wanita
Nama Lengkap : ${invitationData.nama_lengkap_wanita}
Nama Panggilan : ${invitationData.nama_panggilan_wanita}
Nama Ayah : ${invitationData.nama_ayah_wanita}
Nama Ibu : ${invitationData.nama_ibu_wanita}
Instagram : ${invitationData.instagram_wanita}
Facebook : ${invitationData.facebook_wanita}
Twitter : ${invitationData.twitter_wanita}

Data Akad
Tanggal: ${invitationData.tanggal_akad}
Dilaksanakan Pada: ${invitationData.jam_mulai_akad} - ${invitationData.jam_selesai_akad}
Zona Waktu: ${invitationData.zona_waktu_akad}
Lokasi: ${invitationData.lokasi_akad}
Google Maps Akad: ${invitationData.google_maps_akad}

Data Resepsi
Tanggal: ${invitationData.tanggal_resepsi}
Dilaksanakan Pada: ${invitationData.jam_mulai_resepsi} - ${invitationData.jam_selesai_resepsi}
Zona Waktu: ${invitationData.zona_waktu_resepsi}
Lokasi: ${invitationData.lokasi_resepsi}
Google Maps Resepsi: ${invitationData.google_maps_resepsi}
`;
  }
}

module.exports = new WeddingInvitationService();
