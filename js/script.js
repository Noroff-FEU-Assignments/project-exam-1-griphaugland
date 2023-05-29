/* Fetch slider*/
const slider = document.querySelector(".slider");
const sliderLeft = document.querySelector(".sliderLeft");
const sliderRight = document.querySelector(".sliderRight");
const url = "https://gripdev.no/exam1/wp-json/wp/v2/posts?_embed=wp:featuredmedia";
const delay = 400;
const loader = document.getElementById("loader");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const sliderHeader = document.querySelector('.slider-header')
let recipes = [];

function getRecipesSlider() {
  loader.classList.add("show");
  loader.classList.remove("hide");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      recipes = data.slice(0, 8);
      renderSlider();
      loader.classList.add("hide");
      loader.classList.remove("show");
    });
}

prevBtn.onclick = () => {
  prev();
  sliderHeader.style.display = "none"
};

nextBtn.onclick = () => {
  next();
  sliderHeader.style.display = "none"
};

let focusRecipe = 0;

function renderSlider() {
  loader.classList.add("show");
  loader.classList.remove("hide");

  let leftRecipe = focusRecipe - 1;
  let rightRecipe = focusRecipe + 1;

  if (leftRecipe < 0) {
    leftRecipe = recipes.length - 1;
  }
  if (rightRecipe >= recipes.length) {
    rightRecipe = 0;
  }

  const focusedRecipe = recipes[focusRecipe];
  const leftSliderRecipe = recipes[leftRecipe];
  const rightSliderRecipe = recipes[rightRecipe];

  let focusMedia = focusedRecipe._embedded["wp:featuredmedia"][0].source_url;
  let leftMedia = leftSliderRecipe._embedded["wp:featuredmedia"][0].source_url;
  let rightMedia = rightSliderRecipe._embedded["wp:featuredmedia"][0].source_url;

  sliderLeft.innerHTML = `
    <div id="left-box" class="box">
      <div class="recipe-container">
        <div class="image_wrapper">
          <img class="imageel-sides" alt="left recipe image blurred" src="${leftMedia}">
        </div> 
      </div>
    </div>`;

  slider.innerHTML = `
    <a href="/pages/specific.html?id=${focusedRecipe.id}" class="box">
      <div class="recipe-container">
        <div class="image_wrapper">
          <img class="imageel" alt="Image of focus recipe" src="${focusMedia}">
          <div class="excerpt-container">
            <h1 class="recipe-main">${focusedRecipe.title.rendered}</h1>
            ${focusedRecipe.excerpt.rendered}
          </div>
        </div>
      </div> 
    </a>`;

  sliderRight.innerHTML = `
    <div id="right-box" class="box">
      <div class="recipe-container">
        <div class="image_wrapper">
          <img class="imageel-sides" alt="right recipe image blurred" src="${rightMedia}">
        </div> 
      </div>
    </div>`;

  loader.classList.add("hide");
  loader.classList.remove("show");
}

function next() {
  focusRecipe += 1;
  if (focusRecipe >= recipes.length) {
    focusRecipe = 0;
  }
  renderSlider();
}

function prev() {
  focusRecipe -= 1;
  if (focusRecipe < 0) {
    focusRecipe = recipes.length - 1;
  }
  renderSlider();
}

setTimeout(() => {
  getRecipesSlider();
}, delay);

function renderLoader() {
    loader.classList.add("show");
    loader.classList.remove("hide");
    setTimeout( ()=> {
    loader.classList.add("hide");
    loader.classList.remove("show"); 
 }, delay)
}


