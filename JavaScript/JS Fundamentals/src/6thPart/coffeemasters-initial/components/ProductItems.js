import { addToCart } from "../services/Order.js";
export default class ProductItem extends HTMLElement {
    constructor(){  //No Shadow Dom
        super();
    }

    connectedCallback(){
        const template = document.getElementById("product-item-template");
        const content = template.content.cloneNode(true);

        this.appendChild(content);  //appending Template
        
        const product = JSON.parse(this.dataset.product);   //parsing that we got from the datatset
        //querying different parts of the tempate and filling tem in
        this.querySelector("h4").textContent = product.name;
        this.querySelector("p.price").textContent = `$${product.price.toFixed(2)}`;
        this.querySelector("img").src = `data/images/${product.image}`;
        this.querySelector("a").addEventListener("click",event =>{
            //we are attaching an event listener over the anchor (this is current target)
            //event.target; Target is actually anything like the button
            //event.currentTarget;  //a
            console.log(event.target.tagName);
            if (event.target.tagName.toLowerCase()=="button"){
                addToCart(product.id);
            } else {
                app.router.go(`/product-${product.id}`);
            }
            event.preventDefault();
        })
    }
}

customElements.define("product-item",ProductItem);