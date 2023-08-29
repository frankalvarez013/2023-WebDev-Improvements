const Store = {
    menu: null,
    cart: []
}
const proxiedStore = new Proxy(Store, {
    set(target,property,value){
        //we don't want to validate data
        //first thing is apply the change
        target[property] = value;
        //how we announce that the data has changed? (Why announce it? In case someone wants to know just an alert)
        //callback or observer techniques
        if (property=="menu"){
            window.dispatchEvent(new Event("appmenuchange"));   //we use window because we now have two documents. If we just had one we could have used document.dispatchEvent...and window applies to the global
        }
        if(property=="cart"){   //How do we actually change cart? The properties inside of it yes, but the actual cart doesn't change.
            window.dispatchEvent(new Event("appcartchange"));
        }
        return true; //We accept the change by returning true
    }
    

})

//we don't want it to just be global so export it
// export default Store;
export default proxiedStore; //like a higher order function we can just call the proxiedStore