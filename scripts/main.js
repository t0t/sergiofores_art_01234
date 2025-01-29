import Header from './header.js';
import Home from './home.js';
import Gallery from './gallery.js';
import ArtworkDetail from './artwork-detail.js';

// Initialize the app
const initApp = () => {
  const header = Header();
  document.getElementById('header').replaceWith(header);
};

// Route matching
const matchRoute = async (pathname) => {
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
    <a href="/" data-link>Volver al inicio</a>
  `;
  return notFound;
};

// Handle navigation
const handleNavigation = async () => {
  try {
    const main = document.getElementById('main');
    const view = await matchRoute(window.location.pathname);
    
    // Clear main content and append new view
    main.innerHTML = '';
    main.appendChild(view);
    
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Error handling navigation:', error);
    const errorView = document.createElement('div');
    errorView.className = 'error-message';
    errorView.innerHTML = `
      <h1>Error</h1>
      <p>Ha ocurrido un error al cargar la página. Por favor, intenta de nuevo.</p>
      <a href="/" data-link>Volver al inicio</a>
    `;
    document.getElementById('main').innerHTML = '';
    document.getElementById('main').appendChild(errorView);
  }
};

// Initialize app and handle navigation
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  handleNavigation();

  // Handle link clicks
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      history.pushState(null, '', link.href);
      handleNavigation();
    }
  });

  // Handle back/forward
  window.addEventListener('popstate', handleNavigation);
});