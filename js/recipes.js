const main = document.querySelector('#recipes-main');
const url = "https://gripdev.no/projectexamdummy/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=100"
const delay = 500;
const loader = document.getElementById("loader-recipes");
const loadmoreSection = document.querySelector('.loadmore-section')
const loadmoreBtn = document.querySelector('.loadmore-button')
const alphabetSort = document.querySelector('#alphabetSort')
const mostRecent = document.querySelector('#mostRecent')
const oldest = document.querySelector('#oldest')
const fastest = document.querySelector('#fastest')
let allRecipes = [];

const getRecipes = () => {
fetch(url)
.then(res => res.json())
.then((data)=>{
    loader.classList.add("show");
    loader.classList.remove("hide");
    allRecipes = data;
    console.log(data)
    renderRecipes(data.slice(0, 10));
    loader.classList.add("hide");
    loader.classList.remove("show");
})
}


const renderRecipes = (recipes) => {
    main.innerHTML = recipes.map((ele) => {
      const { id, title, excerpt, content} = ele;
      let imagesmall = ele._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
      let imagemedium = ele._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;
      let imagelarge = ele._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
      let media = ele._embedded["wp:featuredmedia"][0].source_url;
      let renderedContent = ele.content.rendered
      const timeToMake = getTimeToMake(renderedContent); 
      return `
      <a href="/pages/specific.html?id=${id}" class="box-recipes">
      <div class="time">${timeToMake}</div>
      <div class="image_wrapper">
      <img class="imageel" alt="Image of ${title}" srcset="${imagesmall} ${imagesmall.width}w, ${imagemedium} ${imagemedium.width}w, ${imagelarge} ${imagelarge.width}w"
      sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, (max-width: 1300px) 1200px" src="${media}">
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

function getTimeToMake(renderedContent) {
  const renderedDummy = document.createElement('div');
  renderedDummy.innerHTML = renderedContent;
  const contentsPtag = renderedDummy.querySelector('p.timeToMake');
  if (contentsPtag) {
    return contentsPtag.textContent;
  }
}

const loadMoreRecipes = () => {
    const remainingRecipes = allRecipes.slice(10); 
    renderRecipes(allRecipes); 
    loadmoreSection.style.display = "none";
    main.style.paddingBottom = "8rem";
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
    })
    renderRecipes(sortedRecipes);
    loadmoreSection.style.display = "none";
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
    }) 
    renderRecipes(sortedRecipes); 
    loadmoreSection.style.display = "none";
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
    }) 
    renderRecipes(sortedRecipes); 
    loadmoreSection.style.display = "none";
  };

  const SortRecipesFastest = () => {
    getTimeToMake();
    const sortedRecipes = allRecipes.sort(function (a, b) {
      const timeToMakeA = getTimeToMake(a.content.rendered);
      const timeToMakeB = getTimeToMake(b.content.rendered);
      
      if (timeToMakeA < timeToMakeB) {
        return -1;
      }
      if (timeToMakeA > timeToMakeB) {
        return 1;
      }
      return 0;
    })
    renderRecipes(sortedRecipes); 
    loadmoreSection.style.display = "none";
  };

  alphabetSort.addEventListener('click', 
  SortRecipesAlphabet)
  mostRecent.addEventListener('click', 
  SortRecipesNewest)
  oldest.addEventListener('click', 
  SortRecipesOldest)
  fastest.addEventListener('click', 
  SortRecipesFastest)


