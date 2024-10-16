const axios = require('axios');

class MusicService {
  constructor() {
    this.apiBaseUrl = process.env.API_BASE_URL;
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
      console.error('Error fetching music list:', error);
      throw new Error('Gagal mengambil daftar musik');
    }
  }

  async getListMusicPaginated(username, page = 1, itemsPerPage = 5) {
    const allMusic = await this.getListMusic(username);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMusic = allMusic.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allMusic.length / itemsPerPage);

    return {
      music: paginatedMusic,
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  }

  async searchMusic(username, query) {
    const allMusic = await this.getListMusic(username);
    return allMusic.filter(music => 
      music.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getMusicById(username, musicId) {
    const allMusic = await this.getListMusic(username);
    console.log('All music:', allMusic);
    console.log('Searching for musicId:', musicId);

    // Pastikan musicId adalah string
    const stringMusicId = String(musicId);

    const foundMusic = allMusic.find(music => {
      console.log('Comparing:', music.id, stringMusicId);
      return String(music.id) === stringMusicId;
    });

    console.log('Found music:', foundMusic);
    return foundMusic;
  }
}

module.exports = new MusicService();
