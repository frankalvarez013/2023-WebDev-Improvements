//Introduction
    //What we'll cover
        //Vanilla JS
        //DOM API
        //Fetch
        //Design Patterns
        //Single Page Applications
        //Web Components
        //Reactive Programming
        //Routing

//Vanilla JS

    //What is Vanilla JS
        //Definition: The usage of the core language and browser APIs to create web apps without any additional libraries or frameworks added on top
        //Vanilla == Plain

    //Why VanillaJS?
        //Add one more tool to your toolbox
        //Undesrtand what your library is doing?
        //Extend your library with plugins
        //Be a better web developer
        //To mix with libraries
        //To use it! You can create simple and fast webapps with no CLI, no build process

    //Main Advantages of Vanilla JS
        //LightWeight
        //Control and Power. When youre using VanillaJS you are making your own decision which can be daunting
        //Flexibility
        //performance
        //Compatibility
        //No node-modules

    //Main Fears of Vanilla JS
        //Routing for Single Page Applications
        //Too Verbose and Time Consuming
        //State Management
        //Templating
        //Complexity
        //Reusable Components
        //Maintenance
        //Learning Curve
        //Browser Compatibility
        //Reinventing the Wheel every time
        //Scalability

    //Note: Learn the tool and use it when it's the best option.
    //Note: We won't advoate for using VanillaJS on every project.

//The DOM API
    //In this workshop, we will be using different techniques and design patterns in parallel

    //DOM ESSENTIALS
        //Definition: The Document Object Model connects web pages to JavaScript by representing the structure of a document in memory
        //DOM API - browser API exposed to developers to manipulate the DOM from a scripting language (JS) trigger an update, like changing the HTML

    //DOM API is available on many objects
        //Window Global Object - global context. Most of the functions we will use here are attached to the global object.
        //Document Object - A document is a DOM. We can have more than one document in the same context.
        //One object per HTML element will have one part of the DOM API so that we can remove or update it (HTML)

    //Whats the Virtual DOM?
        //Clone of the DOM but managed by the library. Kind of like React, it will

    //To work with DOM elements we can:
        //Pick them from the DOM
        //Or Inject them

    //Understanding the thread is a big performance issue that we need to understand!!
    //If JS finishes the DOM will say okay, im going to rerender and then it checks again if there is more JS to execute
    //Kind of like when your event handler finishes

    //Finding Elements in the DOM
            //By ID
            // By Class Name
            // By Name
            // By CSS Selector
            // Navigating DOM structure (like children...)

        //When selecting elements, some functions return
            //One HTML Element (HTMLElement)
            //A Live HTML Element Collections (HTMLCOllection)
            //Static Element Collection (NodeList)

        //Functions to geta rference tone DOM element
            //getElementById
            //querySelector (takes the first h1)
        //NOTE: When you use a function that returns a null
        //Example
            const element = document.querySelector("section> header a");
            if (element != null){
                //element was found!
            }

        //Functions to get a reference to multiple DOM elements
            //getElementsByTagName
            //getElementsByCLassName
            //querySelectorAll() <- static collections
            //getElementByName
        //NOTE: When you use a function that returns multiple elements, it can also return an empty collection if no elements were found
            //Example
                const elements = document.querySelectorAll('#nav-menu li');
                if(elements.length > 0){
                    //elements found
                    const firstElement = elements[0];
                }
        //NOTE: HTMLCollections (live) don't have a some modern Array interfaces like filter map reduce or forEach
            // QUERYSELECTOR WILL BE THE ONLY ONE THAT CAN HAVE THAT
        //NOTE: You can add modern array functions to HTMLCollection by creating an array (wrap into Array.from(document.getElementsByClassName("important")))
        // With an HTMLElement in JS you can
                //Read and change values
                //Reach and change styles
                //Hook event listerners
                //Add remove children
            
//Modifying the DOM
    element.hidden = false;
    element.src = "logo.png";
    element.className = "myClass"; 
    //Changing the Style
    element.style.color = "blue"; //Change into camelCase for style methods
    element.style.fontSize = "1.2em"; //Change into camelCase for style methods

//The DOM
    //IN HTML put the script at the start fo the HTML file and include defer inside the attribute of the script elemnt
    //We used to put it at the bottom of the html because the browser was halting the parsing at the script so you would want to render the html first, however thats deprecated.
    //<script src = "app.js" defer></script>
    //defer means it will run and download in parallel, but script will execte after the HTML has run.
    //<script src = "app.js" async></script>
    //async is for small scripts. Scripts that need to be rendered as fast as possible
    //it will run in parallel however this time, it will pause the html rendering and execute the script unlike defer that will wait later


    var nav = document.querySelector("nav");
    //Not best practice in theory where the DOM structure has not finished yet
    window.addEventListener("DOMContentLoaded", (event) =>{   //This will wait until the DOM Structure has loaded but probably before rendering so you get the best of both worlds.
        var nav = document.querySelector("nav");
        console.log(nav);
    });

    //Advanded Event Handling
        function eventHandler(){

        }
        const options = {
            once: true,
            passive: true
        }
        element.addEventListener("load",eventHandler,options);  //Suirtable for things that happen ONLY once; Example of Scrool
        //If you are scrolling, there is a scrolling event. JS takes too much time with CPU the browser has no time to change the papaer, browser needs to check if your event is changing the DOM!
        //The way to solve this is using passive:true which allows your browser to work while you are moving the the DOM around like scrolling while its persisting kinda like async
    //Dispatching Custom Events
        const event = new Event("mycustomname");
        element.dispatchEvent(event);
    //Helpful ShortHand Methods
        const $ = () => document.querySelector.call(this, arguments);
        const $$ = () => document.querySelectorAll.call(this, arguments);
        HTMLElement.prototype.on = (a,b,c) => this.addEventListener(a,b,c);
        HTMLElement.prototype.off = (a,b) => this.removeEventListener(a,b);
        HTMLElement.prototype.$ = (s) => this.querySelector(s);
        HTMLElement.prototype.$ = (s) => this.querySelectorAll(s);
        const _ = {
            domready : (e) =>{

            }
        }
        //For Example
        var nav = $("nav");
        //instead of nav.addEventListener()
        nav.on("click",()=>{
            console.log("Hi!");
        });
        _.domready
    //Fetching Data 
        //services.js
            //A way of oferring different services to the appp

//Routing
    //Browser Routing & History API

        //Single page Applications: how to change content
            //Remove Previous Page andInject new Page into the DOM
            //Hide Previous Page and Show Current Page.

        //Single Page Application And Router: We want to change the content of the page based on what the user select:
            //We don't have a router in the DOM, we create it
                //Home Page: menu
                //Details of one particular product
                //Order: cart details and order form
            //We wont have multiplie HTML files, we will use the DOM APis and Web Components
            //We will use the History API to push new entries to the navigation
        //Example
            //pushing a new URL; the second argument is unused
            history.pushState(optional_state, null, "/new-url");    //Optional state is for metdata, second argument is unused cuz of specs

            //to listen for changes in URL within the same page navigation
            window.addEventListener("popstate",event =>{
                let url = location.href;
            })
        //popstate won't be fired if the user clicks on an external link or changes the URL manually
        //Popstate only works within the web app.

//Web Components
    //Context
        //Instead of inserting everything itno HTML we can use web components
        // Modular reusable building block for we dev that holds a set of related functionality and user interface elements.
    //Def: In short, your own custom HTML tag elements
    //Pros:
            //Compatible with every browser
            //Set of standards (umbrella) 
                    //Custom Elements
                    // Html Templates
                    // Show DOMExceptionDeclareative Shhadow DOM
            //Its similar to the idea of componentets on most of thelibraires for JS
            //We have freedom of choice on how to define them and use them
    //Custom Element
        //Define new new html element
        //Example
            class MyElement extends HTMLElement {
                constructor(){
                    super();
                    this.dataset.language //ON HTML -> <body><my-eleement data-language="en"></my-element>  we can define our own custom attributes using the data*-spec
                }
            }
            customElements.define("my-element", MyElement);
            //<script>document.createElement("my-element");
            //OR <body><my-element></my-element></body>

    //Custom Elements Lifecycle
        //We can override some methods of the super class
        class MyElement extends HTMLElement {
            constructor(){
                super();
            }
            connectedCallback() {};     //Element is added
            disconnectedCallback(){};   //Eleemnt is removed
            adoptedCallback(){};    //The element has been moved to a new doc
            // attributeChangedCallback(name,oldValue, new Value());
        }
    //Template Element
        //Def: Fragments of markup that can be cloned and inserted into the document at runtime (blah blah)which can be rendered dynamically
        //We have the template elements
            //A tag that the element ignores, 
            //<template><section><ul></ul></section></template> The elements get ignored inside
            //IN JS we get content in template and we create instances of those templates into the DOM
        function connectedCallback(){
            const template = document.getElementById("templateID");
            const content = template.content.cloneNode(true);   //WE clone it and then we use it the template
            this.appendChild(content);
        }
        //If the template Element has a style into it, so css styles apply to the whole doc
        //if template has <template><style..></style><template> it will change all the css changes inside the style sheet for the whole doc and not just the template
    //Shadow DOM
        //Def
            //A private, isolated DOM tree within a web component that is separate from the main document's DOM tree (you have your owon DOM)
            //...We had a chance to adopt an element from another DOM so in this case we are moving an element fromt the shadow DOM to the DOM.
        //Pros:
            //Allows more control over style and encapsulation of functionality of a Custom Element
            //CSS declared in the main DOM won't be applied to the Shadow DOM - by default
            //CSS declared in the Shadow DOM applies only on there.
            //There are new pseudo-classes and pseudo-elemnt to allow communication between DOMS in stylesheets
            //It can be opened or closed defining visibility from the outer DOM
        //Example
        class MyElement extends HTMLElement {
            construcotr() {
                super();
                this.root = this.attachedShadow({mode: "open"});
            }

            connectedCallback(){
                this.root.appendCHild(); //Now we have our innerDOM and work with the Inner DOM
            }
        }
        //Now the style will only work with that specific componenet when using the template method
        //Where to define HTML for a Custom Element
            //Alternatives:
                //Use DOM APIs
                //Use a <template> in the main HTML
                //Use an external HTML file loaded with fetch( it can be prefetched)

    //Declarative Shadow DOM
        //Def:
            //A way to define Shadow DOM directly in HTML markup using a new set of attributes and tags
        //Where to define CSS for a Custom Element
            //Alternatives
                //Use CSSOM APis
                //Add a <script> to a <template>
                //Link
                //Use an external CSS file loaded with fetch ( it can be prefteched ) and injected in the Shadow DOM as a <style>
//Reactive Programming with Proxyies
    //Creating a Proxy
        //Def: Simple way that we have in JS to listen for changes in an object
        //      (A wrapper object that performs operations on a wrapped obct)
    //Ex
        //const original = {name: 'John Doe', age: 30}
        //const s = new Proxy(original, handler);
        //const handler = {get: function(target,prop){if(property === 'age'){return target[prop]+' years old';} else {return target[prop];}}}
        //handler is an object. get is a function that will be executed everytime someone is getting
        // a specific property. if property is age I will take the current val of that property and add something to it
        // Kind of a getter for an object. Once you create that object, you will never need to use it again, you will just need to  use a proxy.
        //console.log(s.age); //30 years old
        //We can use a proxy for validation, data binding and reactive programming
        //We can instead of get use a set, when we try to update the value
        //Proxies work with objects only.
        //Proxy Handler is the second argument/object that contains traps for interceptings/
        //Proxy Trap - intercepts an customeizes (kind of like an event)
        //Most Used Proxy Traps
            //get
            //set********** means taht someone is changing the value of property (someone has changed the art or cart, we can trigger updates and update the UI)
            //has
            //deleteProperty
            //apply
            //construct
            //getOwnPropertyDescriptor
            //defineProperty
            //ownKeys
//Double Binding
    //Binding Form Data
        //When you are typing something and you change the input can we automatically update the object?
        //Have an automatic change in the input
        //For that we can use the same idea as the proxy

//If we try to go to direct link, it will give us an error
        //Single page aplication you have to set up your server for forwarding.
        //React does the same, if we create a react folder and put it into apache it won't work because it has the ame error.