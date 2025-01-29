import Header from './header.js';
import Home from './home.js';
import Gallery from './gallery.js';
import ArtworkDetail from './artwork-detail.js';

// Get base URL for GitHub Pages
const getBaseUrl = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? ''
    : '/sergiofores_art_01234';
};

// Initialize the app
const initApp = () => {
  const header = Header();
  document.getElementById('header').replaceWith(header);
};

// Route matching
const matchRoute = async (pathname) => {
  // Remove base URL from pathname
  const baseUrl = getBaseUrl();
  if (pathname.startsWith(baseUrl)) {
    pathname = pathname.slice(baseUrl.length);
  }
  
  // Normalize the pathname
  pathname = pathname.replace(/^\/+|\/+$/g, '');
  
  // Root shows home
  if (pathname === '') {
    return await Home();
  }

  // Match routes
  if (pathname === 'gallery') {
    return await Gallery();
  }

  const artworkMatch = pathname.match(/^artwork\/(.+)$/);
  if (artworkMatch) {
    return await ArtworkDetail({ id: artworkMatch[1] });
  }

  // 404 page
  return createNotFoundPage();
};

// Create 404 page
const createNotFoundPage = () => {
  const notFound = document.createElement('div');
  notFound.className = 'not-found';
  notFound.innerHTML = `
    <h1>404</h1>
    <p>Lo sentimos, la página que buscas no existe.</p>
    <a href="${getBaseUrl()}/" data-link>Volver al inicio</a>
  `;
  return notFound;
};

// Handle navigation
const handleNavigation = async () => {
  try {
    const main = document.getElementById('main');
    if (!main) return;

    const pathname = window.location.pathname;
    const content = await matchRoute(pathname);
    
    main.innerHTML = '';
    main.appendChild(content);

    // Update active nav link
    const navLinks = document.querySelectorAll('[data-link]');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === pathname) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

// Initialize app and handle navigation
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  handleNavigation();

  // Handle navigation links
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      window.history.pushState({}, '', href);
      handleNavigation();
    }
  });

  // Handle browser back/forward
  window.addEventListener('popstate', handleNavigation);
});