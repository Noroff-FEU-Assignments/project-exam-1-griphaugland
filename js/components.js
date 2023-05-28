/* Nav Bar */
const hamburgerMenu = document.querySelector('.hamburger');
const navBar = document.querySelector('.navbar');
let menuOpen = false;



hamburgerMenu.onclick = () => {
    if (!menuOpen) {
        hamburgerMenu.classList.toggle('active');
        navBar.classList.toggle('activenav');
        document.body.style.cssText = "overflow: hidden;"
        menuOpen = true;    
    } else {
        hamburgerMenu.classList.toggle('active');
        navBar.classList.toggle('activenav');
        document.body.style.cssText = "overflow: visible;"
        menuOpen = false;
    }
}