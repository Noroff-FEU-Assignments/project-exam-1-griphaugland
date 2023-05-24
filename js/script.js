/* Fetch slider*/
const slider = document.querySelector(".slider")
const url = "https://gripdev.no/exam1/wp-json/wp/v2/posts?_embed=wp:featuredmedia"
const delay = 500;
const loader = document.getElementById("loader");

const getRecipesSlider = () => {
fetch(url)
.then(res => res.json())
.then((data)=>{
    loader.classList.add("show");
    loader.classList.remove("hide");
    renderSlider(data)
    loader.classList.add("hide");
    loader.classList.remove("show");
})

}

function renderSlider(data) {
        slider.innerHTML = data.map((ele, index, arr) => 
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
        
console.log(data)
}
  setTimeout(() => {getRecipesSlider()}, delay);


  