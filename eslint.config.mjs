import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node
      },
    },
    rules: {
      // Gunakan Object.assign sebagai alternatif untuk structuredClone
      'constructor-super': ['error'],
      // Aturan untuk merapikan indentasi
      'indent': ['error', 'tab'],
      'no-tabs': 'off', // Izinkan penggunaan tab
      'no-mixed-spaces-and-tabs': 'error', // Mencegah campuran spasi dan tab
      'no-trailing-spaces': 'error', // Menghapus spasi di akhir baris
      // Aturan tambahan untuk konsistensi kode
      'semi': ['error', 'always'], // Selalu gunakan titik koma di akhir pernyataan
      'quotes': ['error', 'single'], // Gunakan tanda kutip tunggal untuk string
      'comma-dangle': ['error', 'always-multiline'], // Koma di akhir untuk multiline
      // Tambahkan aturan lain jika diperlukan
    },
  },
];
