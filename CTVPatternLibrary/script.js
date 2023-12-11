const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('nav ul li a');

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 300 &&
        rect.bottom >= 300
    );
}

function handleScroll() {
    sections.forEach((section, index) => {
        if (isElementInViewport(section)) {
            section.classList.add('section-selected');
            navItems[index].classList.add('selected');
        } else {
            section.classList.remove('section-selected');
            navItems[index].classList.remove('selected');
        }
    });
}

window.addEventListener('scroll', handleScroll);

handleScroll();
