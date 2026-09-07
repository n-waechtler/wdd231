const mainnav = document.querySelector('nav ul');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('open');
    hambutton.classList.toggle('open');

    if (hambutton.classList.contains('open')) {
        hambutton.setAttribute('aria-label', 'Close Menu');
        hambutton.innerHTML = '&#1006;';
    } else {
        hambutton.setAttribute('aria-label', 'Open Menu');
        hambutton.innerHTML = '&#9776';
    }
});