/* Fetch slider*/
const slider = document.querySelector(".slider")
const sliderLeft = document.querySelector(".sliderLeft")
const sliderRight = document.querySelector(".sliderRight")
const url = "https://gripdev.no/exam1/wp-json/wp/v2/posts?_embed=wp:featuredmedia"
const delay = 400;
const loader = document.getElementById("loader");

const getRecipesSlider = () => {
    loader.classList.add("show");
    loader.classList.remove("hide");
fetch(url)
.then(res => res.json())
.then((data)=>{
    renderSlider(data)
    loader.classList.add("hide");
    loader.classList.remove("show");
})

}

function renderSlider(recipes) {
    /* let recipes = []; // Array to store the recipes
let currentIndex = 0; // Index of the currently selected recipe
const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => {
  navigateCarousel(1); // Move to the next recipe
});
const prevButton = document.getElementById("prev-button");
prevButton.addEventListener("click", () => {
  navigateCarousel(-1); // Move to the previous recipe
});
 */
const index = recipes
const currentIndex = recipes.slice(3,5)

        sliderLeft.innerHTML = recipes.slice(0, 2).map((ele, index, arr) => 
        {
            const {id, title, excerpt} = ele;
            let media = ele._embedded["wp:featuredmedia"][0].source_url;
            return `
            <a href="/pages/specific.html?id=${id}" class="box">
            <div class="recipe-container"

                <div class="image_wrapper">
                <img class="imageel" src="${media}">
                <div class="excerpt-container">
                <h1 class="recipe-main">${title.rendered}</h1>
                ${excerpt.rendered}</div>
                </div>
            </div> 
        </a>`;
        }
        ).join("")
        
        slider.innerHTML = recipes.slice(1, 2).map((ele, index, arr) => 
        {
            const {id, title, excerpt} = ele;
            let media = ele._embedded["wp:featuredmedia"][0].source_url;
            return `
            <a href="/pages/specific.html?id=${id}" class="box">
            <div class="recipe-container"

                <div class="image_wrapper">
                <img class="imageel" src="${media}">
                <div class="excerpt-container">
                <h1 class="recipe-main">${title.rendered}</h1>
                ${excerpt.rendered}</div>
                </div>
            </div> 
        </a>`;
        }
        ).join("")
}
  setTimeout(() => {getRecipesSlider()}, delay);


function renderLoader() {
    loader.classList.add("show");
    loader.classList.remove("hide");
    setTimeout( ()=> {
    loader.classList.add("hide");
    loader.classList.remove("show"); 
 }, delay)
   
}