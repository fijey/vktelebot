const MY_TOKEN = process.env.BOT_TOKEN;

const WEDDING_INVITATION_SCENE_ID = 'CREATE_WEDDING_INVITATION';
const MUSIC_SCENE_ID = 'MUSIC_SCENE';

const SAKINAH_ACTION = 'sakinah';
const MAWADAH_ACTION = 'mawadah';

const MANUAL_INPUT = 'manual_input';
const TEMPLATE_FORM = 'template_form';

const CONFIRM_INVITATION_ACTION = 'confirm_invitation';
const CREATE_AGAIN_WITH_TEMPLATE = 'create_again';

const TEMPLATE_FORM_SAKINAH = `
Form Data Undangan Digital

Harap diisi dan diperiksa dengan baik sebelum diserahkan kepada kami, guna menghindari kesalahan ejaan dan sebagainya.

Email=>
Phone=>
Subdomain=>

Data Diri Mempelai Pria
Nama Lengkap=> 
Nama Panggilan=>
Nama Ayah=>
Nama Ibu=>
Social Media Pria (Opsional)
Instagram=>
Facebook=>
Twitter=>

Data Diri Mempelai Wanita
Nama Lengkap=> 
Nama Panggilan=>
Nama Ayah=>
Nama Ibu=>
Social Media (Opsional)
Instagram=>
Facebook=>
Twitter=>

Detail Acara Akad
Tanggal=>
Jam Mulai=>
Jam Selesai=>
Lokasi=>
Google Maps=>
Zona Waktu=>

Detail Acara Resepsi
Tanggal=>
Jam Mulai=>
Jam Selesai=>
Lokasi=>
Google Maps=>
Zona Waktu=>

Untuk Foto Galeri bisa dikirim via whatsapp document
Setelah kamu kirim semua data, maka selanjutnya Pesanan Undangan Digital kamu akan masuk tahap pembuatan/produksi. Lamanya tahapan pembuatan/produksi maksimal 1x24 jam. Mohon ditunggu yah.
`;

module.exports = {
    MY_TOKEN,
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