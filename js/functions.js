import {
  cardBox,
  modalDetails,
  modalDetailFood,
  videoElement,
  selector
} from "./selectors.js";

const catBreakfast =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast";
const catChicken =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=chicken";
const catDessert =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert";
const catPasta = "https://www.themealdb.com/api/json/v1/1/filter.php?c=pasta";
const catVegan =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=vegetarian";
const catSeaFood =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=seafood";

  export function selectAreas(){
    debugger
    const urlAreas = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    fetch(`${urlAreas}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      listAreas(json.meals);
    })
    .catch((e) => console.log(e));
  }

  function listAreas(areas){
    areas.forEach(area=>{
      const option = document.createElement('option');
      option.value = area.strArea;
      option.textContent= area.strArea;
      selector.appendChild(option);
    });
  }

  const param = {area:''};

  export function getArea(e){
    console.log(e);
    param.area = e.target.value;
    const urlArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${param.area}`
    getCards(urlArea);
  }

  export function getCategory(e) {
  const id = e.currentTarget.id;
  let category = "";
  switch (id) {
    case "cat1":
      category = catChicken;
      break;
    case "cat2":
      category = catBreakfast;
      break;
    case "cat3":
      category = catPasta;
      break;
    case "cat4":
      category = catSeaFood;
      break;
    case "cat5":
      category = catVegan;
      break;
    case "cat6":
      category = catDessert;
      break;
    default:
      category = catBreakfast;
  }
  getCards(category);
}

function getCards(link) {
  fetch(`${link}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      printCards(json.meals);
    })
    .catch((e) => console.log(e));
}





function cleanCards() {
  let cardsDisplay = document.querySelectorAll(".card");
  for (let c = 0; c < cardsDisplay.length; c++) {
    cardsDisplay[c].remove();
  }
}

function showDetails(idMeal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      openModal(json.meals[0]);
    })
    .catch((e) => console.log(e));
}

function printCards(meals) {
  cleanCards();
  let html = "";
  meals.forEach((meal) => {
    const { strMeal, strMealThumb, idMeal } = meal;
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = strMealThumb;
    img.alt = "image food";
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    const title = document.createElement("h5");
    title.className = "card-title";
    title.innerText = strMeal;
    cardBody.appendChild(title);

    const detailsButton = document.createElement("button");
    detailsButton.className = "btn btn-primary btnDetails";
    detailsButton.innerText = "Ver detalles";
    detailsButton.setAttribute("data-idMeal", idMeal); // Almacenar el idMeal como atributo personalizado
    cardBody.appendChild(detailsButton);

    const initRefer = document.createElement("a");
    initRefer.className = "aInit";
    initRefer.setAttribute("href", '#'); // Regresar al inicio
    
    const iconElement = document.createElement("i");
    iconElement.className = "fa-solid fa-utensils";
    
    initRefer.appendChild(iconElement);
    cardBody.appendChild(initRefer);
    

    html += card.outerHTML;
  });

  cardBox.innerHTML = html;

  // Agregar el evento de clic a todos los botones con la clase 'btnDetails'
  const btnDetailsList = document.querySelectorAll(".btnDetails");
  btnDetailsList.forEach((btn) => {
    btn.addEventListener("click", function () {
      const idMeal = this.getAttribute("data-idMeal"); // Obtener el idMeal del atributo personalizado
      showDetails(idMeal);
    });
  });
}

function openModal(meal) {
  let html = "";
  html += `
  <h5 class="title-meal">${meal.strMeal}</h5>
  <p>Categoría: ${meal.strCategory}</p>
  <p>Área: ${meal.strArea}</p>
  <div class="video-container">
    <iframe width="420" height="215" id="videoModal" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" frameborder="0" allowfullscreen></iframe>
  </div>
`;
  console.log(meal.strYoutube);

  modalDetails.innerHTML = html;

  const modal = new bootstrap.Modal(modalDetailFood);
  modal.show();

 
}
// Agrega el evento "hidden.bs.modal" para detener el video cuando el modal se cierre
modalDetailFood.addEventListener('hidden.bs.modal', function () {
    videoModal.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  });
  
  // Agrega el evento "shown.bs.modal" para reiniciar el video cuando el modal se muestre
  modalDetailFood.addEventListener('shown.bs.modal', function () {
    videoModal.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  });

export function addCar(){

}

export function handlePlay() {
  videoElement.play();
}

export function handlePause() {
  videoElement.pause();
}

