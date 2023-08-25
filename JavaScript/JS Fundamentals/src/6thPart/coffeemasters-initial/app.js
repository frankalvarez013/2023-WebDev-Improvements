//now that this is a module thru htnml we can export
import Store from './services/Store.js';        //This doens't need {} because we are using export default    
import {loadData} from './services/Menu.js';    //This needs {} because its exporting the function
import Router from './services/Router.js';
//IS Store Global? No its not global because its a module
//One pattern is to talk to the window option for special situations so we are breaking the module for a sec
//with modules you can pick whats global using the below code
//everytime we use app we are accessing that singleton
//before modules they were global

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