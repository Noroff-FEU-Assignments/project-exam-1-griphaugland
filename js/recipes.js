const main = document.querySelector('#recipes-main');
const url = "https://gripdev.no/exam1/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=100"
const delay = 2000;
const loader = document.getElementById("loader-recipes");
const loadmoreSection = document.querySelector('.loadmore-section')
const loadmoreBtn = document.querySelector('.loadmore-button')
const alphabetSort = document.querySelector('#alphabetSort')
const mostRecent = document.querySelector('#mostRecent')
const oldest = document.querySelector('#oldest')
let allRecipes = [];

const getRecipes = () => {
fetch(url)
.then(res => res.json())
.then((data)=>{
    loader.classList.add("show");
    loader.classList.remove("hide");
    allRecipes = data;
    renderRecipes(data.slice(0, 10)); 
    loader.classList.add("hide");
    loader.classList.remove("show");
})
}

const renderRecipes = (recipes) => {
    main.innerHTML = recipes.map((ele) => {
      const { id, title, excerpt } = ele;
      let media = ele._embedded["wp:featuredmedia"][0].source_url;
      return `
        <a href="/pages/specific.html?id=${id}" class="box-recipes">
          <div class="time">15-30min</div>
          <div class="image_wrapper">
            <img class="imageel" src="${media}">
          </div>
          <div class="title-container">
            <h1 class="recipes-main">${title.rendered}</h1>
          </div>
        </a>`;
    }).join("");
    if (allRecipes.length > 9) {
        loadmoreSection.style.display = "flex";
      } else {
        loadmoreSection.style.display = "none";
      }
}

const loadMoreRecipes = () => {
    const remainingRecipes = allRecipes.slice(10); 
    renderRecipes(allRecipes); 
    loadmoreSection.style.display = "none";
  };
  
  loadmoreBtn.addEventListener('click', loadMoreRecipes);
  setTimeout(getRecipes, delay);

  const SortRecipesAlphabet = () => {
    const sortedRecipes = allRecipes.sort(function (a, b) {
      if (a.title.rendered < b.title.rendered) {
        return -1;
      }
      if (a.title.rendered > b.title.rendered) {
        return 1;
      }
      return 0;
    }).slice(0, 10);; 
    renderRecipes(sortedRecipes);
  };

  const SortRecipesNewest = () => {
    const sortedRecipes = allRecipes.sort(function (a, b) {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    }).slice(0, 10);; 
    renderRecipes(sortedRecipes); 
  };

  const SortRecipesOldest = () => {
    const sortedRecipes = allRecipes.sort(function (a, b) {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    }).slice(0, 10);; 
    renderRecipes(sortedRecipes); 
  };

  alphabetSort.addEventListener('click', 
  SortRecipesAlphabet)
  mostRecent.addEventListener('click', 
  SortRecipesNewest)
  oldest.addEventListener('click', 
  SortRecipesOldest)