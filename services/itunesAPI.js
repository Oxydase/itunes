import axios from 'axios';

export const fetchTracks = async (term) => {
  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term,
        entity: 'musicTrack',
        limit: 25,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erreur API iTunes:', error);
    return [];
  }
};
