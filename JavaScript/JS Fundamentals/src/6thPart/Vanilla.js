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
        //To work with DOM elements we can,
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
        