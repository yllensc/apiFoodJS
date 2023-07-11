import { category1, category2, category3, category4, category5, category6, cardBox } from "./selectors.js";

const catBreakfast= "https://www.themealdb.com/api/json/v1/1/list.php?c=breakfast";
const catChicken = "https://www.themealdb.com/api/json/v1/1/list.php?c=chicken";
const catDessert = "https://www.themealdb.com/api/json/v1/1/list.php?c=dessert";
const catPasta = "https://www.themealdb.com/api/json/v1/1/list.php?c=pasta";
const catVegan = "https://www.themealdb.com/api/json/v1/1/list.php?c=vegetarian";
const catSeaFood = "https://www.themealdb.com/api/json/v1/1/list.php?c=seafood";

export function getCategory(e){
    const id = e.target.getAttribute("id");
    debugger
    const category = '';
    switch(id){
        case 'cat1': category = catChicken;
            break;
        case 'cat2': category = catBreakfast;
            break;
        case 'cat3': category = catPasta;
            break;
        case 'cat4': category = catSeaFood;
            break;
        case 'cat5': category = catVegan;
            break;
        case 'cat6': category = catDessert;
            break;
        default:category = catBreakfast;
    }
    getCardsByCategory(category);
    
}

function getCardsByCategory(linkCategory){
    fetch(`${linkCategory}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        cardBox.style.display = "none";
        cardBox.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      cleanCards();
    
    })
    .catch((e)=>console.log(e));

}

function cleanCards(){
    let cardsDisplay = document.querySelectorAll('.card');
    for(let c = 0; c < cardsDisplay.length; c++){
        cardsDisplay[c].remove();
    }
}