import { getArtworkById } from './data.js';

const ArtworkDetail = async (id) => {
  const detail = document.createElement('article');
  detail.className = 'artwork-detail';

  try {
    console.log('ArtworkDetail component id:', id); // Debug log
    
    if (!id) {
      throw new Error('No artwork ID provided');
    }

    const artwork = await getArtworkById(id);
    console.log('Artwork data received:', artwork); // Debug log

    if (!artwork) {
      detail.innerHTML = `
        <section class="error-message" role="alert">
          <h1>Obra no encontrada</h1>
          <p>Lo sentimos, la obra que buscas no existe.</p>
          <a href="/" data-link>Volver a la galería</a>
        </section>
      `;
      return detail;
    }

    detail.innerHTML = `
      <div class="detail-container">
        <header class="detail-header">
          <nav class="artwork-navigation" aria-label="Navegación de obra">
            <a href="/" class="back-button" data-link aria-label="Volver a la galería">&larr; Volver a la galería</a>
          </nav>
          <h1>${artwork.title}</h1>
        </header>
        
        <div class="detail-content">
          <figure class="artwork-image-container">
            <img src="/${artwork.image}" 
                 alt="${artwork.title}" 
                 loading="lazy"
                 width="800"
                 height="600">
            <figcaption class="visually-hidden">${artwork.title} - ${artwork.technique}</figcaption>
          </figure>
          
          <section class="artwork-info">
            <dl class="technical-details">
              <div class="detail-item">
                <dt>Técnica</dt>
                <dd>${artwork.technique}</dd>
              </div>
              <div class="detail-item">
                <dt>Dimensiones</dt>
                <dd>${artwork.dimensions}</dd>
              </div>
              <div class="detail-item">
                <dt>Año</dt>
                <dd>${artwork.year}</dd>
              </div>
              ${artwork.exhibition ? `
                <div class="detail-item">
                  <dt>Exposición</dt>
                  <dd>${artwork.exhibition}</dd>
                </div>
              ` : ''}
            </dl>
            
            ${artwork.description ? `
              <section class="description-section">
                <h2>Sobre la obra</h2>
                <p>${artwork.description}</p>
              </section>
            ` : ''}
            
            ${artwork.details ? `
              <section class="description-section">
                <h2>Detalles técnicos</h2>
                <p>${artwork.details}</p>
              </section>
            ` : ''}
            
            ${artwork.tags && artwork.tags.length > 0 ? `
              <section class="tags-section" aria-label="Etiquetas">
                <h2 class="visually-hidden">Etiquetas</h2>
                <ul class="tags-list" role="list">
                  ${artwork.tags.map(tag => `
                    <li><span class="tag">${tag}</span></li>
                  `).join('')}
                </ul>
              </section>
            ` : ''}
          </section>
        </div>
      </div>
    `;

  } catch (error) {
    console.error('Error in ArtworkDetail:', error);
    detail.innerHTML = `
      <section class="error-message" role="alert">
        <h1>Error al cargar la obra</h1>
        <p>Ha ocurrido un error al cargar los detalles de la obra. Por favor, intenta de nuevo más tarde.</p>
        <a href="/" data-link>Volver a la galería</a>
      </section>
    `;
  }

  return detail;
};

export default ArtworkDetail;