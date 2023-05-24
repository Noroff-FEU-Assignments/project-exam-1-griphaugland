const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const url = 'https://gripdev.no/exam1/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=20';
const delay = 1000;
const loader = document.getElementById("loaderFullPage");
const main = document.getElementById('specific');
const tilbehor = document.querySelector('.tilbehor')
const body = document.querySelector("body");

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
    document.title = `StudentSnacks ${recipe.title.rendered}`

    let media = recipe._embedded["wp:featuredmedia"][0].source_url;
            main.innerHTML = 
        `
        <div class="modal">
         <div class="closeModal"><i id="cross" class="fa-solid fa-x"></i></div>
         <img class="modal-img" src="${media}" alt="Image of ${recipe.title.rendered}"> />
        </div>
             <div class="title-ingredients-wrapper">
                <div class="container">  
                    <h1 class="title-specific">${recipe.title.rendered} <div class="timespecific"></div></h1>
                    <div class="filter-specific"></div>
                    <div class="specific-image">
                        <img class="spec-img-el" src="${media}" alt="Image of ${recipe.title.rendered}">
                    </div>
                 </div>    
                </div>   
                </div>    
             </div>
           <div class="wrapper-recipe">  
                <div class="ingredients-accessories">
                    <div class="ingredients"></div>
                    <div id="accessories" class="accessories"><h4>Tilbehør</h4></div>
                </div>
                <div class="preparation-tips">    
                    <div class="preparation"><h3>Tilberedning</h3></div>
                    <div class="tips-recipe"></div>
                    <div class="commentsection">
                        <div class="displayComments"></div>
                        <div class="writeComment"></div>
                    </div>
                </div>   
            </div>
            <div class="hidden">${recipe.content.rendered}</div>
            `;
                document.querySelector('.timespecific').appendChild(document.querySelector('.timeToMake')); 
                document.querySelector('.ingredients').appendChild(document.querySelector('.ingredienser'));
                document.querySelector('.preparation').appendChild(document.querySelector('.tilberedning'));
                document.querySelector('.accessories').appendChild(document.querySelector('.tilbehor'));
                document.querySelector('.tips-recipe').appendChild(document.querySelector('.tips'));
                const filterSpecific = document.querySelector('.filter-specific');
                const modal = document.querySelector('.modal');
                const modalImage = document.querySelector('.modal-img')
                const x = document.querySelector('.closeModal')
                let modalOpen = false;
                filterSpecific.addEventListener('click', () => {
                    if(!modalOpen){
                        modal.style.display = "flex";
                        modalOpen = true;
                    }
                });
                if (modalOpen == true) {
                    main.style.cursor = "pointer";
                    modalImage.style.cursor = "default"
                } else {
                    main.style.cursor = "default";
                }
                x.onclick = (e) => {
                        modal.style.display = "none";
                        modalOpen = false;
                }
    }
    fetchRecipes();