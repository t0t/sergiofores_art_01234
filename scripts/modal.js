let modalInstance = null;
let currentArtworks = [];
let currentIndex = -1;

// Calculate scrollbar width once
const getScrollbarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

const scrollbarWidth = getScrollbarWidth();

const createModal = () => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'true');
  
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const content = document.createElement('div');
  content.className = 'modal-content';
  
  const artworkContainer = document.createElement('div');
  artworkContainer.className = 'modal-artwork-container';
  
  content.appendChild(artworkContainer);
  modal.appendChild(overlay);
  modal.appendChild(content);
  
  // Navigation buttons
  const prevButton = document.createElement('button');
  prevButton.className = 'modal-nav modal-prev';
  prevButton.setAttribute('aria-label', 'Obra anterior');
  prevButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  `;
  
  const nextButton = document.createElement('button');
  nextButton.className = 'modal-nav modal-next';
  nextButton.setAttribute('aria-label', 'Obra siguiente');
  nextButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  `;
  
  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'modal-close';
  closeButton.setAttribute('aria-label', 'Cerrar modal');
  closeButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  `;
  
  content.appendChild(prevButton);
  content.appendChild(nextButton);
  content.appendChild(closeButton);
  
  // Event listeners
  const close = () => {
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.documentElement.style.removeProperty('--scrollbar-width');
    currentIndex = -1;
    currentArtworks = [];
  };
  
  const navigateToArtwork = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < currentArtworks.length) {
      currentIndex = newIndex;
      updateModalContent(currentArtworks[currentIndex], artworkContainer);
      updateNavigationState();
    }
  };
  
  const updateNavigationState = () => {
    prevButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex >= currentArtworks.length - 1;
    prevButton.style.opacity = prevButton.disabled ? "0.5" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0.5" : "1";
  };
  
  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', close);
  prevButton.addEventListener('click', () => navigateToArtwork(-1));
  nextButton.addEventListener('click', () => navigateToArtwork(1));
  
  // Keyboard navigation
  const handleKeydown = (e) => {
    if (modal.getAttribute('aria-hidden') === 'false') {
      switch(e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowLeft':
          navigateToArtwork(-1);
          break;
        case 'ArrowRight':
          navigateToArtwork(1);
          break;
      }
    }
  };
  
  document.addEventListener('keydown', handleKeydown);
  
  return {
    element: modal,
    artworkContainer,
    show: () => {
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      updateNavigationState();
    },
    close,
    updateNavigationState
  };
};

const getModal = () => {
  if (!modalInstance) {
    modalInstance = createModal();
    document.body.appendChild(modalInstance.element);
  }
  return modalInstance;
};

const updateModalContent = (artwork, container) => {
  const imagePath = artwork.image.startsWith('/') ? artwork.image : `/${artwork.image}`;
  
  container.innerHTML = `
    <div class="modal-artwork">
      <figure class="modal-image">
        <img src="${imagePath}" 
             alt="${artwork.title}"
             loading="eager">
      </figure>
      <div class="modal-info">
        <h2>${artwork.title}</h2>
        <dl class="artwork-details">
          ${artwork.technique ? `
            <div class="detail-item">
              <dt>Técnica</dt>
              <dd>${artwork.technique}</dd>
            </div>
          ` : ''}
          ${artwork.dimensions ? `
            <div class="detail-item">
              <dt>Dimensiones</dt>
              <dd>${artwork.dimensions}</dd>
            </div>
          ` : ''}
          ${artwork.year ? `
            <div class="detail-item">
              <dt>Año</dt>
              <dd>${artwork.year}</dd>
            </div>
          ` : ''}
        </dl>
        ${artwork.description ? `
          <div class="artwork-description">
            <p>${artwork.description}</p>
          </div>
        ` : ''}
        ${artwork.details ? `
          <div class="artwork-details-text">
            <p>${artwork.details}</p>
          </div>
        ` : ''}
        ${artwork.exhibition ? `
          <div class="artwork-exhibition">
            <p><strong>Exposición:</strong> ${artwork.exhibition}</p>
          </div>
        ` : ''}
        ${artwork.tags && artwork.tags.length > 0 ? `
          <div class="artwork-tags">
            ${artwork.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
};

export const openModal = (artwork, artworks) => {
  currentArtworks = artworks || [];
  currentIndex = currentArtworks.findIndex(a => a.id === artwork.id);
  
  const modal = getModal();
  updateModalContent(artwork, modal.artworkContainer);
  modal.show();
};
