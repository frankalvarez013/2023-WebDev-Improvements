import prisma from "../db"

// Get all
export const getProducts = async (req,res) =>{
    //think of the query needed for this
    //how to get all product users
    //user has product array and we know product belongs to user
    //req only has user id and name so we have to query it
    const user = await prisma.user.findUnique({
        where: {
            //reason its req.user and not req.body is cuz we want from the JWT token we created the id that was associated via code
            id: req.user.id
        },
        //considered population, extract and include info
        include: {
            products: true
        }
    })
    res.json({data: user.products})
    //better to send back objects instead of the straight up user.products cuz its easier to check on the front-endd
}

// Get one
export const getOneProduct = async (req,res)=>{
    //params is the route parameter where we got from :id <-urlencoded({extended:true} that we added on server.ts)
    const id = req.params.id
    //we can query a product that belongs to the signed in user and the id that is here
    //we could just query for hte id, but wouldn't that mean we can query any id? so we have to scope it to the user and the product id
    const product = await prisma.product.findFirst({
        where: {
            id: id,
            belongsToId:req.user.id
        }
    })
    res.json({data: product})
}

export const createProduct = async (req,res)=>{
    const product = await prisma.product.create({
        data: {
            //input validation allow our handlers to flow well
            //safely assume everything is there
            name: req.body.name,
            belongsToId: req.user.id
        }
    })
    res.json({data: product})
}

export const updateProduct = async (req,res)=>{
    const updated = await prisma.product.update({
        //use where to find it, use data to update it
        where: {
            //we have an index between id and belongsToId
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })
    //usually on update its kind of you as an api, the thing that you updated with the updates on it otherwise the client will have to do another
    //request to get the updated thing which is what we do in this line below. 
    res.json({data:updated})
}

export const deleteProduct = async (req,res) => {
    const deleted = await prisma.product.delete({
        where: {
            //we have an index between id and belongsToId
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })
    res.json({data: deleted})
}