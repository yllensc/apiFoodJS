import { category1, category2, category3, category4, category5, category6, cardBox, modalDetails } from "./selectors.js";

const catBreakfast= "https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast";
const catChicken = "https://www.themealdb.com/api/json/v1/1/filter.php?c=chicken";
const catDessert = "https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert";
const catPasta = "https://www.themealdb.com/api/json/v1/1/filter.php?c=pasta";
const catVegan = "https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian";
const catSeaFood = "https://www.themealdb.com/api/json/v1/1/filter.php?c=seafood";

export function getCategory(e){
    const id = e.currentTarget.id;
    debugger
    let category = '';
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
    .then(response =>{return response.json()} )
    .then((json) => {printCards(json.meals);})
    .catch((e)=>console.log(e));

}

function cleanCards(){
    let cardsDisplay = document.querySelectorAll('.card');
    for(let c = 0; c < cardsDisplay.length; c++){
        cardsDisplay[c].remove();
    }
}

  

function printCards(meals) {
    cleanCards();
    let html = '';
    meals.forEach(meal => {
      const { strMeal, strMealThumb, idMeal } = meal;
  
      const card = document.createElement('div');
      card.className = 'card';
      card.style.width = '18rem';
  
      const img = document.createElement('img');
      img.className = 'card-img-top';
      img.src = strMealThumb;
      img.alt = 'image food';
      card.appendChild(img);
  
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      card.appendChild(cardBody);
  
      const title = document.createElement('h5');
      title.className = 'card-title';
      title.innerText = strMeal;
      cardBody.appendChild(title);
  
      const detailsButton = document.createElement('button');
      detailsButton.className = 'btn btn-primary';
      detailsButton.innerText = 'Ver detalles';
      detailsButton.addEventListener('click', () => showDetails(idMeal));
      cardBody.appendChild(detailsButton);
  
      html += card.outerHTML;
    });
  
    cardBox.innerHTML = html;
  }
  


  function showDetails(idMeal){
    debugger
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(response =>{return response.json()} )
    .then((json) => {openModal(json.meals);})
    .catch((e)=>console.log(e));

}

function openModal(meal) {
    let html = '';
    html += `
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="details">${meal.strMeal}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Categoría: ${meal.strCategory}</p>
        <p>Área: ${meal.strArea}</p>
        <video src="${meal.strYoutube}"></video>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>`;
    debugger
    document.modalDetails.insertAdjacentHTML('beforebegin', html);
  
    // Abrir el modal utilizando Bootstrap
    const myModal = new bootstrap.Modal(document.getElementById('modalDetails'));
    myModal.show();
  }
  