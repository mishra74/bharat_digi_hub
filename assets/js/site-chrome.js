const siteNavbar = document.querySelector('.navbar');
const siteMobileMenu = siteNavbar.querySelector('.mobile-navigation');

function updateSiteNavbar() {
  const scrolled = window.scrollY > 50;
  siteNavbar.classList.toggle('sticky', scrolled);
  siteNavbar.classList.toggle('scrolled', scrolled);
}

window.addEventListener('scroll', updateSiteNavbar, { passive: true });
updateSiteNavbar();

siteMobileMenu.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('a')) {
    siteMobileMenu.open = false;
  }
});

document.getElementById('footer-year').textContent = new Date().getFullYear();
