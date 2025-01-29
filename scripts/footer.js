const Footer = () => {
   const footer = document.createElement('footer');
   const p = document.createElement('p');
   p.textContent = `&copy; ${new Date().getFullYear()} Your Name. All rights reserved.`;
   footer.appendChild(p);
   return footer;
 };
 
 export default Footer;