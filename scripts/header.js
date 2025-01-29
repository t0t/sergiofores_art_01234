const Header = () => {
  const header = document.createElement('header');
  header.className = 'main-header';

  // Logo container
  const logoContainer = document.createElement('div');
  logoContainer.className = 'logo-container';
  
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.setAttribute('data-link', '');
  logoLink.setAttribute('aria-label', 'Inicio');
  
  const logo = document.createElement('object');
  logo.type = 'image/svg+xml';
  logo.data = '/assets/logo.svg';
  logo.className = 'logo';
  logo.setAttribute('aria-hidden', 'true');
  logo.setAttribute('role', 'img');
  
  logoLink.appendChild(logo);
  logoContainer.appendChild(logoLink);

  // Navigation
  const nav = document.createElement('nav');
  nav.className = 'main-nav';
  nav.setAttribute('aria-label', 'Navegación principal');

  const createLink = (text, href) => {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = href;
    link.setAttribute('data-link', '');
    link.setAttribute('role', 'menuitem');
    return link;
  };

  // Menu items
  const menuItems = document.createElement('div');
  menuItems.className = 'menu-items';
  menuItems.setAttribute('role', 'menu');
  menuItems.appendChild(createLink('Galería', '/gallery'));
  nav.appendChild(menuItems);

  // Mobile menu button
  const menuButton = document.createElement('button');
  menuButton.className = 'menu-button';
  menuButton.setAttribute('aria-label', 'Abrir menú');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', 'menu-items');
  menuButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  `;
  
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    header.classList.toggle('menu-open');
    menuButton.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
  });

  nav.appendChild(menuButton);

  // Add scroll event listener to handle header transparency
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scrolled');
    } else {
      header.classList.add('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('header-hidden');
      if (header.classList.contains('menu-open')) {
        header.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    } else {
      header.classList.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
  });

  header.appendChild(logoContainer);
  header.appendChild(nav);
  
  return header;
};

export default Header;