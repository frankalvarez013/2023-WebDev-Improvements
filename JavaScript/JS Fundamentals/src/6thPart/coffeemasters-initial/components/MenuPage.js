export class MenuPage extends HTMLElement {
    constructor(){
        super();
        //We will refactor this
        // const template = document.getElementById("menu-page-template");
        // const content = template.content.cloneNode(true); //Do you want deep clone? if template has another template you can clone that other template so say yes if you want it
        // this.appendChild(content); //However you can't just add to the children cuz we created a class/constructor   
        //Applying shadowDOM:
        this.root  = this.attachShadow({mode: 'open'}); //if outside wants to access the inner dom
        //Best way to load CSS is to create a function(can you create a function in constructor? remember functions are just a diff kind of object a variable)
        const styles = document.createElement("style");
        this.root.appendChild(styles);
        async function loadCSS(){
            //Why creatre func?
            //Cuz we use fetch
            const request = await fetch("/components/MenuPage.css");
            const css = await request.text();
            styles.textContent = css;
        }
        loadCSS();
    }
    connectedCallback(){    //To fix the line 7 problem we move the three lines to the connectedCallback(). When the component is attached to the DOM we call this method!
        const template = document.getElementById("menu-page-template");
        const content = template.content.cloneNode(true);
        // this.appendChild(content); Changed Line 
        //For shadow DOM we can put this method inside the constructor now because we are not applying children to yourself but do a different thing/Document:
        this.root.appendChild(content) //for shadow we just add root
        //When menu changes we can the anon function below
        window.addEventListener("appmenuchange",()=>{   //Our Proxy worked because the event appmenuchange was fired and that triggered our render method and it worked.
            this.render();
        });
        //We only call render when the menu changes, so we load on the first time, but when we are disconnecting that page and connecting to another page
        //the data is not changing so it will not render again
        //Until we do this.render();
        //so everytime we are connecting again to the same apge we will do this
        this.render();
    }
    render(){
        if (app.store.menu){ //if menu is null write loading
            this.root.querySelector("#menu").innerHTML = ""; //When we use appendchild like line 43, we have to clear the content because ("go to line 46")...
            for (let category of app.store.menu){
                const liCategory = document.createElement("li");
                liCategory.innerHTML =  `
                <h3>${category.name}</h3>
                <ul class = 'category'>
                </ul>
                `;
                this.root.querySelector("#menu").appendChild(liCategory);
                //now need to design the products. For each row we want to create another component
                category.products.forEach(product =>{
                    const item = document.createElement("product-item");    //Doesnt exist yet, it will create the HTML tag but browser wont know how to render that so it will render nothing
                    item.dataset.product = JSON.stringify(product); //To render it we have to put into component.
                    liCategory.querySelector("ul").appendChild(item); // Wont work becuz we haven't registered the custom element yet.
                })
            }
        } else {
            this.root.querySelector("#menu").innerHTML = "Loading...";  //... we will still keep the original loading becuase we will keep the previous content and we are appending new elements
        }
    }
    //It will be when the router creates the element and appends it to the HTML element
}
customElements.define("menu-page",MenuPage);    //name and associated class in html you would do <menu-page></menu-page>
//When we define that means browser will know that we created an HTML elemnt
//we Created a custom element that we can call