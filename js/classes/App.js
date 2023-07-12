import { category1, category2, category3, category4, category5, category6, selector, btnCarAdd } from "../selectors.js";
import { selectAreas, getCategory, getArea, addCar } from '../functions.js'
class ApiFood{
    constructor(){
        this.initProgram();
    }

    initProgram(){
        selectAreas();
        category1.addEventListener('click',getCategory);
        category2.addEventListener('click',getCategory);
        category3.addEventListener('click',getCategory);
        category4.addEventListener('click',getCategory);
        category5.addEventListener('click',getCategory);
        category6.addEventListener('click',getCategory);
        selector.addEventListener('input', getArea);
        btnCarAdd.addEventListener('click',addCar());

    }
}

export default ApiFood;