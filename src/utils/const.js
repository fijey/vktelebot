
const WEDDING_INVITATION_SCENE_ID = 'CREATE_WEDDING_INVITATION';
const MUSIC_SCENE_ID = 'MUSIC_SCENE';

const SAKINAH_ACTION = 'sakinah';
const MAWADAH_ACTION = 'mawadah';

const MANUAL_INPUT = 'manual_input';
const TEMPLATE_FORM = 'template_form';

const CONFIRM_INVITATION_ACTION = 'confirm_invitation';
const CREATE_AGAIN_WITH_TEMPLATE = 'create_again';

const TEMPLATE_FORM_SAKINAH = `
Form Data Undangan Paket Sakinah

Harap diisi dan diperiksa dengan baik sebelum diserahkan kepada kami, guna menghindari kesalahan ejaan dan sebagainya.

Email:
Phone:
Subdomain:

Link yang akan digunakan: nama link (.visualkreatif.com)
Contoh link: .visualkreatif.com

Link Anda:

Data Diri Mempelai Pria
Nama Lengkap=> 
Nama Panggilan=>
Nama Ayah=>
Nama Ibu=>
Social Media Pria (Opsional)
Instagram Pria=>
Facebook Pria=>
Twitter Pria=>

Data Diri Mempelai Wanita
Nama Lengkap=> 
Nama Panggilan=>
Nama Ayah=>
Nama Ibu=>
Social Media Wanita (Opsional)
Instagram Wanita=>
Facebook Wanita=>
Twitter Wanita=>

Detail Acara Akad
Tanggal Akad=>
Jam Mulai Akad=>
Jam Selesai Akad=>
Lokasi Akad=>
Google Maps Akad=>
Zona Waktu Akad=>

Detail Acara Resepsi
Tanggal Resepsi=>
Jam Mulai Resepsi=>
Jam Selesai Resepsi=>
Lokasi Resepsi=>
Google Maps Resepsi=>
Zona Waktu Resepsi=>

Untuk Foto Galeri bisa dikirim via whatsapp document
Setelah kamu kirim semua data, maka selanjutnya Pesanan Undangan Digital kamu akan masuk tahap pembuatan/produksi. Lamanya tahapan pembuatan/produksi maksimal 1x24 jam. Mohon ditunggu yah.
`;

module.exports = {
    WEDDING_INVITATION_SCENE_ID,
    SAKINAH_ACTION,
    MAWADAH_ACTION,
    MANUAL_INPUT,
    TEMPLATE_FORM,
    TEMPLATE_FORM_SAKINAH,
    CONFIRM_INVITATION_ACTION,
    CREATE_AGAIN_WITH_TEMPLATE,
    MUSIC_SCENE_ID,
};