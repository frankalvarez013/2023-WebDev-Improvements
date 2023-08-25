import API from "./API.js";

//Here we are just seperating responsibilities. We are just making it look better

export async function loadData() {
    app.store.menu = await API.fetchMenu();
}