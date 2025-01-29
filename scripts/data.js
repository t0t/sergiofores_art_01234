let artworksData = null;
let homeData = null;

const loadArtworks = async () => {
  if (artworksData === null) {
    try {
      console.log('Fetching artworks data...'); // Debug log
      const response = await fetch('./data/artworks.json');
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

export const getArtworks = async () => {
  return await loadArtworks();
};

export const getArtworkById = async (id) => {
  try {
    console.log('Getting artwork with id:', id); // Debug log
    const artworks = await loadArtworks();
    const artwork = artworks.find(artwork => artwork.id === parseInt(id));
    console.log('Found artwork:', artwork); // Debug log
    return artwork;
  } catch (error) {
    console.error('Error getting artwork by id:', error);
    throw error; // Re-throw to handle in component
  }
};

const loadHomeData = async () => {
  if (homeData === null) {
    try {
      const response = await fetch('./data/home.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      homeData = data;
    } catch (error) {
      console.error('Error loading home data:', error);
      homeData = {};
      throw error;
    }
  }
  return homeData;
};

export const getHomeData = async () => {
  return await loadHomeData();
};

export { getArtworks, getArtworkById, getHomeData };