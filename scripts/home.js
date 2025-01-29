import { getHomeData } from './data.js';

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
        <a href="${hero.ctaLink}" class="cta-button" data-link>${hero.ctaText}</a>
      </div>
      <div class="hero-image">
        <img src="${hero.image.src}" 
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
    document.title = data.meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', data.meta.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = data.meta.description;
      document.head.appendChild(meta);
    }

  } catch (error) {
    console.error('Error rendering home page:', error);
    home.innerHTML = `
      <div class="error-message">
        <h1>Error</h1>
        <p>Ha ocurrido un error al cargar la página. Por favor, intenta de nuevo.</p>
        <a href="/" data-link>Recargar</a>
      </div>
    `;
  }

  return home;
};

export default Home;
