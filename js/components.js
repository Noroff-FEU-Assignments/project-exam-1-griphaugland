/* Nav Bar */
const hamburgerMenu = document.querySelector('.hamburger');
const navBar = document.querySelector('.navbar');
let menuOpen = false;



hamburgerMenu.onclick = () => {
    if (!menuOpen) {
        hamburgerMenu.classList.toggle('active');
        navBar.classList.toggle('activenav');
        menuOpen = true;    
    } else {
        hamburgerMenu.classList.toggle('active');
        navBar.classList.toggle('activenav');
        menuOpen = false;
    }
}

/* function sliderNext() {
    if(index > 2 ){
        return
       }
    let x = 1;
    let nextBtn = x + 1;

    
}
function sliderPrev() {
    if(index > 2 ){
        return
       }
    let currentSlide = x;
    
} */

/* const nextBtn = document.querySelector('.next-btn')
nextBtn.onclick = () => {
    sliderNext();
} */
/* const prevBtn = document.querySelector('.prev-btn')
prevBtn.onclick = () => {
    sliderPrev();
} */