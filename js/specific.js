const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const url = 'https://gripdev.no/exam1/wp-json/wp/v2/posts?_embed=wp:featuredmedia';
const delay = 1000;
const loader = document.getElementById("loader");
const main = document.querySelector('#specific')


const fetchRecipes = () => {
    fetch(url)
    .then(res => res.json())
    .then((data)=>{
        loader.classList.add("show");
        loader.classList.remove("hide");
        getSingleRecipe(data[id]); 
        console.log(data)
        loader.classList.add("hide");
        loader.classList.remove("show");
    })
}

const getSingleRecipe = () => {
  
        main.innerHTML = 
        `<h1 class="">${recipe.title}</h1>
                </div>  
                <div class="jacketdesccontainer"> 
                <p class="jacketdesc">${recipe.excerpt.rendered}</p> 
                </div>`
        loader.classList.add("hide");
        loader.classList.remove("show");
    }