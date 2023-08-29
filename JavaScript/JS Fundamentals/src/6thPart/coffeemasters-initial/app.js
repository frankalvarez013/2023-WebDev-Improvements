//now that this is a module thru htnml we can export
import Store from './services/Store.js';        //This doens't need {} because we are using export default    
import {loadData} from './services/Menu.js';    //This needs {} because its exporting the function
import Router from './services/Router.js';
//IS Store Global? No its not global because its a module
//One pattern is to talk to the window option for special situations so we are breaking the module for a sec
//with modules you can pick whats global using the below code
//everytime we use app we are accessing that singleton
//before modules they were global

//Link My Web Component
import {MenuPage} from './components/MenuPage.js';  //Just by importing the browser will load that file and it will execute that model and execute the define in the .js and
    //Browser will now know we are defining a new web component
import {OrderPage} from './components/OrderPage.js';
import {DetailsPage} from './components/DetailsPage.js';
import ProductItem from './components/ProductItems.js';
import CartItem from './components/CartItem.js';
//side effect of importing the file is executing the file
window.app = {}     //app could be any name
app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", async () => {
    //load the data
    //We can call API since we imported it
    //!!!!!!!! const menu = await API.fetchMenu(); !!!!!!!!
    //But we are in DOMContentLoaded, its an event handler - local - we can render our menu from here but its not modular
    //When the dom is loaded we fetch the data and render the DOM BUT WE CAN DO BETTER1!!!!!!!!!!!
    //That may signify that we want to create another service, chang ehte order things around changing the data modal.
    loadData();
    app.router.init();
})
//How to import both API and App.js? T ouse ES modules, we all need these scripts to Modules

//every time the cart is changing we can change that even before rendering the section. And to do that we can do that in app.js because this is globa (part of the navigation)
//Thats our custom event, every time the cart is changing so we want it to do something (change from data changes)
window.addEventListener("appcartchange",event =>{
    const badge = document.getElementById("badge");
    // const qty = app.store.cart.length; //This wont work, how many items int the cart
    const qty = app.store.cart.reduce((acc,item)=>acc + item.quantity, 0);
    badge.textContent = qty;
    badge.hidden = qty == 0;
});