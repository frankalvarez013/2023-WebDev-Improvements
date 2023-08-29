import API from "./API.js";

//Here we are just seperating responsibilities. We are just making it look better

export async function loadData() {
    app.store.menu = await API.fetchMenu(); //going to API and stored into menu
                                            //It looks like we are using the proxy and the change to the menu should trigger the proxy
}
//If its verifying in a local array why do async??
//Maybe we don't hav ethe menu yet, so we check
export async function getProductById(id){
    if (app.store.menu===null){
        await loadData();
    }
    for (let c of app.store.menu){
        for (let p of c.products){
            if (p.id ==id){
                return p;
            }
        }
    }
    return null;
}