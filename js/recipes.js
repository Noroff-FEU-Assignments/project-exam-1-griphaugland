const main = document.querySelector('#recipes-main');
const url = "https://gripdev.no/exam1/wp-json/wp/v2/posts?_embed=wp:featuredmedia"
const delay = 2000;
const loader = document.getElementById("loader-recipes");

const getRecipesSlider = () => {
fetch(url)
.then(res => res.json())
.then((data)=>{
    loader.classList.add("show");
    loader.classList.remove("hide");
    renderAllRecipes(data)
    loader.classList.add("hide");
    loader.classList.remove("show");
})

}

function renderAllRecipes(data) {
        main.innerHTML = data.map((ele, index, arr) => 
        {
            const {id, title, excerpt} = ele;
            let media = ele._embedded["wp:featuredmedia"][0].source_url;
            return `
            <a href="/pages/specific.html?id=${id}" class="box-recipes">
                <div class="image_wrapper">
                 <img class="imageel" src="${media}">
                </div>
                <div class="title-container">
                <h1 class="recipes-main">${title.rendered}</h1>
                </div>
              </a>`;
        }
        ).join("")
        
console.log(data)
}
  setTimeout(() => {getRecipesSlider()}, delay);

