import { category1, category2, category3, category4, category5, category6 } from "../selectors.js";
import { getCategory } from '../functions.js'
class ApiFood{
    constructor(){
        this.initProgram();
    }

    initProgram(){
        category1.addEventListener('click',getCategory);
        category2.addEventListener('click',getCategory);
        category3.addEventListener('click',getCategory);
        category4.addEventListener('click',getCategory);
        category5.addEventListener('click',getCategory);
        category6.addEventListener('click',getCategory);

    }
}

export default ApiFood;