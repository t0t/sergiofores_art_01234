import { getArtworks } from './data.js';
import { openModal } from './modal.js';

const Gallery = async () => {
  const gallery = document.createElement('div');
  gallery.className = 'gallery';

  try {
    const artworks = await getArtworks();
    const grid = document.createElement('div');
    grid.className = 'artwork-grid';

    artworks.forEach(artwork => {
      const card = document.createElement('article');
      card.className = 'artwork-card';
      card.setAttribute('data-artwork-id', artwork.id);

      const imageContainer = document.createElement('div');
      imageContainer.className = 'artwork-image-container';

      const img = document.createElement('img');
      img.className = 'artwork-image';
      img.src = artwork.image.startsWith('./') ? artwork.image : `./${artwork.image}`;
      img.alt = artwork.title;
      img.loading = 'lazy';

      imageContainer.appendChild(img);
      card.appendChild(imageContainer);

      // Handle image load errors
      img.onerror = () => {
        console.error(`Error loading image for artwork: ${artwork.title} (${img.src})`);
        imageContainer.classList.add('image-error');
        img.style.display = 'none';
      };

      // Add click event listener
      card.addEventListener('click', () => {
        openModal(artwork, artworks);
      });

      grid.appendChild(card);
    });

    gallery.appendChild(grid);

    // Update page metadata
    document.title = 'Galería - Sergio Fores';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explora la colección de obras de arte de Sergio Fores. Pinturas al óleo y técnicas mixtas.');
    }

  } catch (error) {
    console.error('Error loading gallery:', error);
    gallery.innerHTML = `
      <div class="error-message">
        <h1>Error</h1>
        <p>Ha ocurrido un error al cargar la galería. Por favor, intenta de nuevo.</p>
        <button onclick="window.location.reload()">Recargar</button>
      </div>
    `;
  }

  return gallery;
};

export { Gallery as default };