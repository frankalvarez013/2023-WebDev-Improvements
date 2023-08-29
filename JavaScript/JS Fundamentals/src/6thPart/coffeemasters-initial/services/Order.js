import { getProductById } from "./Menu.js";

export async function addToCart(id){
    const product = await getProductById(id);
    //if its the first capp in the cart i ened to add a new entry
    //if i already have it, I need to update it to 2 new cappucinos
    const results = app.store.cart.filter(prodInCart => prodInCart.product.id == id);
    if (results.length==1){
        // The product is already in the cart
        // update the current item
        app.store.cart = app.store.cart.map(    
            p => p.product.id == id     //if current id is the one we are adding, so we will return a new object wiht all the properties and qunatity being the increment of the p.quantity
                ? {...p, quantity: p.quantity+ 1}
                : p
        );
    } else {
        // app.store.cart.push({product, quantity: 1});
        app.store.cart = [...app.store.cart, {product, quantity: 1}];   //new array that will spread the current cart and it will add that new option
        // Reason why we have to do the above is because since we don't update the cart, but rather the contents of the cart, we need to trigger the event listener we created in the Store.js
        // so we create a new array to produce that listener for the cart changes.
    }
}

export function removeFromCart(id){
    app.store.cart = app.store.cart.filter(p => p.product.id!= id);
}