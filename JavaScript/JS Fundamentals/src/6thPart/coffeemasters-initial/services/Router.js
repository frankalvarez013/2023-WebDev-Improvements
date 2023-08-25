const Router =  {
    init: () =>{
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click",event => {
                event.preventDefault(); //Stop the browser to make a new navigation. You need to talk to the "event"we called on line 4.
                                        //We want to take those links and tell the browser not to use those links as usual
                // const url1 = event.target.href;    //we can access "a" as a variable within the event handler because of closure
                const url = event.target.getAttribute("href");
                Router.go(url);
            })
        })
        //Check the initial URL
        Router.go(location.pathname);   //When we initialize the app we cbeck the initial url, cuz a user could have a link to /cart
    },
    go: (route, addToHistory=true) =>{
        console.log(`Going to ${route}`);

        if (addToHistory){
            history.pushState({ route }, '', route);    //This is just faking, this url doesn't actually move into another url since this is a one page application
        }
        let pageElement = null; //This means that we will simply inject the content that this "other" url would have into the page
        switch (route){
            case "/":
                pageElement = document.createElement("h1");
                pageElement.textContent = "Menu";
                break;
            case "/order":
                pageElement = document.createElement("h1");
                pageElement.textContent = "Your Order";
                break;
            default:
                if (route.startWith("/product-")){
                    pageElement = document.createElement("h1");
                    pageElement.textContent = "Details";
                    const paramId = route.substring(route.lastIndexOf("-")+1);
                    pageElement.dataset.id = paramId;
                }
        }
        const cache = document.querySelector("main");         //children will give us nodes
        cache.innerHTML = "";           //Empty out the container because although we inject the stuff in the DOM it will not remove the previous one. So if we continuosly go between one and
                                        //another url it will just inject the elements without refreshing.
        cache.appendChild(pageElement);
        window.scrollX = 0;
        window.scrollY = 0;
    }
}
export default Router;