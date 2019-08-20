let currentThemeBtn = null;

function init() {
    // load home content
    loadPage(document.querySelector('.nav-item.current'), 'home.html');

    // Select DOM Items
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const menuBranding = document.querySelector('.menu-branding');
    const menuNav = document.querySelector('.menu-nav');
    const navItems = document.querySelectorAll('.nav-item');

    // Set initial state of menu
    let showMenu = false;

    menuBtn.addEventListener('click', toggleMenu);

    function toggleMenu() {
        if (!showMenu) {
            menuBtn.classList.add('close');
            menu.classList.add('show');
            menuNav.classList.add('show');
            menuBranding.classList.add('show');
            navItems.forEach(item => item.classList.add('show'));

            for (let i = 0; i < navItems.length; i++) {
                navItems[i].style.transitionDelay = (i + 1) * 0.1 + 's';
            }

            // Set menu state
            showMenu = true;
        } else {
            menuBtn.classList.remove('close');
            menu.classList.remove('show');
            menuNav.classList.remove('show');
            menuBranding.classList.remove('show');
            navItems.forEach(item => item.classList.remove('show'));

            // Set menu state
            showMenu = false;
        }
    }
}

function switchTheme(themeBtn, themeColor) {
    currentThemeBtn = themeBtn;
    const root = document.documentElement;
    const themeButtons = document.querySelectorAll('.theme-btn');

    themeBtn.classList.add('theme-current');
    for (let i = 0; i < themeButtons.length; i++) {
        if (themeButtons[i] !== themeBtn) {
            themeButtons[i].classList.remove('theme-current')
        }
    }

    root.style.setProperty('--primary-color', themeColor);

    if (themeColor == '#444') {
        // dark theme
        root.style.setProperty('--primary-color-light', '#555');
        root.style.setProperty('--primary-color-dark', '#333');
        root.style.setProperty('--primary-letter-color', '#fff');
        root.style.setProperty('--secondary-color', '#eece1a');
        root.style.setProperty('--secondary-letter-color', '#111');
    } else if (themeColor == '#036') {
        // nightblue theme
        root.style.setProperty('--primary-color-light', '#147');
        root.style.setProperty('--primary-color-dark', '#025');
        root.style.setProperty('--primary-letter-color', '#fff');
        root.style.setProperty('--secondary-color', '#eece1a');
        root.style.setProperty('--secondary-letter-color', '#111');
    } else {
        // light theme
        root.style.setProperty('--primary-color-light', '#f4f4f4');
        root.style.setProperty('--primary-color-dark', '#d0d0d0');
        root.style.setProperty('--primary-letter-color', '#111');
        root.style.setProperty('--secondary-color', '#147');
        root.style.setProperty('--secondary-letter-color', '#fff');
    }
}

function loadPage(currentLink, page) {
    let http = new XMLHttpRequest();

    http.onload = function () {

        // paste response html
        document.querySelector('.wrapper').innerHTML = this.response;
        // remove background image if not home content
        // highlight theme button
        if (page == 'home.html') {
            document.body.classList.add('bg-image');
            if (currentThemeBtn !== null) {
                let themeBtn = document.querySelector('.' + currentThemeBtn.classList[1]);
                let themeEvent = new Event('click');
                themeBtn.dispatchEvent(themeEvent);
            } else {
                document.body.classList.remove('bg-image');
            }
        }

        // remove current navLink & toggle menu button if page is not loaded the first time
        let menuBtn = document.querySelector('.menu-btn');
        if (menuBtn.classList.contains('close')) {
            let clickEvent = new Event('click');
            menuBtn.dispatchEvent(clickEvent);
            document.querySelector('.nav-item.current').classList.remove('current');
        }

        // switch current navLink
        currentLink.classList.add('current');
    }

    http.open('get', page, true);
    http.send()

}
