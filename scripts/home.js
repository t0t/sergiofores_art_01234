import { getHomeData } from './data.js';

// Get base URL for GitHub Pages
const getBaseUrl = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? ''
    : '/sergiofores_art_01234';
};

const Home = async () => {
  const home = document.createElement('div');
  home.className = 'home';

  try {
    const data = await getHomeData();
    const { hero, features } = data;

    // Hero section
    const heroSection = document.createElement('section');
    heroSection.className = 'hero';
    heroSection.innerHTML = `
      <div class="hero-content">
        <h1>${hero.title}</h1>
        <p class="hero-subtitle">${hero.subtitle}</p>
        <p class="hero-description">${hero.description}</p>
        <a href="${getBaseUrl()}${hero.ctaLink}" class="cta-button" data-link>${hero.ctaText}</a>
      </div>
      <div class="hero-image">
        <img src="${getBaseUrl()}${hero.image.src}" 
             alt="${hero.image.alt}"
             loading="eager"
             width="${hero.image.width}"
             height="${hero.image.height}">
      </div>
    `;

    // Features section
    const featuresSection = document.createElement('section');
    featuresSection.className = 'features';
    featuresSection.innerHTML = `
      <div class="features-grid">
        ${features.items.map(feature => `
          <article class="feature-card">
            <div class="feature-icon">${feature.icon}</div>
            <h2>${feature.title}</h2>
            <p>${feature.description}</p>
          </article>
        `).join('')}
      </div>
    `;

    home.appendChild(heroSection);
    home.appendChild(featuresSection);

    // Update page metadata
    document.title = 'Sergio Fores | Portafolio Artístico';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explora el portafolio artístico de Sergio Fores. Obras en óleo y técnicas mixtas que fusionan tradición y expresión contemporánea.');
    }

  } catch (error) {
    console.error('Error loading home:', error);
    home.innerHTML = `
      <div class="error-message">
        <h1>Error</h1>
        <p>Ha ocurrido un error al cargar la página. Por favor, intenta de nuevo.</p>
        <button onclick="window.location.reload()">Recargar</button>
      </div>
    `;
  }

  return home;
};

export default Home;
