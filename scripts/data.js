let artworksData = null;
let homeData = null;

// Get base URL for GitHub Pages
const getBaseUrl = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? ''
    : '/sergiofores_art_01234';
};

const loadArtworks = async () => {
  if (artworksData === null) {
    try {
      console.log('Fetching artworks data...'); // Debug log
      const response = await fetch(`${getBaseUrl()}/data/artworks.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      artworksData = data.artworks;
      console.log('Artworks data loaded:', artworksData); // Debug log
    } catch (error) {
      console.error('Error loading artworks:', error);
      artworksData = [];
      throw error; // Re-throw to handle in component
    }
  }
  return artworksData;
};

const loadHomeData = async () => {
  if (homeData === null) {
    try {
      const response = await fetch(`${getBaseUrl()}/data/home.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      homeData = data;
    } catch (error) {
      console.error('Error loading home data:', error);
      homeData = {
        title: 'Error loading content',
        content: 'Please try again later'
      };
      throw error;
    }
  }
  return homeData;
};

export const getArtworks = async () => {
  return await loadArtworks();
};

export const getArtworkById = async (id) => {
  const artworks = await loadArtworks();
  return artworks.find(artwork => artwork.id === id);
};

export const getHomeData = async () => {
  return await loadHomeData();
};