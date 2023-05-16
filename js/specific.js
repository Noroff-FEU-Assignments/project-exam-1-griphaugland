const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const url = 'https://gripdev.no/exam1/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=20';
const delay = 1000;
const loader = document.getElementById("loaderFullPage");
const main = document.getElementById('specific');

const fetchRecipes = () => {
    fetch(url)
    .then(res => res.json())
    .then((data)=>{
        loader.classList.add("show");
        loader.classList.remove("hide");
        renderSingleRecipe(data); 
        loader.classList.add("hide");
        loader.classList.remove("show");
    })
}


function renderSingleRecipe(data) {
    const recipe = data.find(post => post.id === parseInt(id));
    let media = recipe._embedded["wp:featuredmedia"][0].source_url;
            main.innerHTML = 
        `<section class="shell">
            <div class="top-specific">
                <h1 class="title-spesific">${recipe.title.rendered}</h1>
                <div class="time">15-20min</div>
            </div>
            <div class="top-middle-wrapper">
             <div class="ingredients"></div>
             <div class="specific-image"><img class="spec-img-el" src="${media}"></div>
            </div>
            <div class="preparation">
                <h3 class="prep-title">Tilberedning</h3>
                ${recipe.content.rendered}
            </div>
                
         </section>        
                `   
    }
    fetchRecipes();