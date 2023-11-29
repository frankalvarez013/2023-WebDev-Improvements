import prisma from "../db";

export const getOneUpdate = async(req,res)=>{
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })
    res.json({data: update})
}

export const getUpdates = async(req,res)=>{
    const products = await prisma.product.findMany({
        where: {
            belongsToId:req.user.id
        },
        include: {
            updates: true
        }
    })
    //this is not the appropriate thing for (cuz of REST) you reduce optimal querying
    //so update your schema cuz imagine there are 20,000 items you need to query/index?
    //you constantly update your schema its not perfect everytime
    const updates = products.reduce((allUpdates, product)=> {
        return [...allUpdates,...product.updates]
    },[])
    res.json({data:updates})
}

export const createUpdate = async(req,res) =>{
    const product = await prisma.product.findUnique({
        where:{
            id: req.body.productId
        }
    })
    if (!product){
        //does not belong to user
        return res.json({message: 'nope'})
    }

    const update = await prisma.update.create({
        //on router.ts we have the necessary data found in route (body(stuff))
        //cuz we have a validator to check on it we should be able to trust it and it should work.
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    })

    res.json({data:update})
}

export const updateUpdate = async(req,res)=>{
    //we get id from parameter, however we need to make sure you are the user who owns that update
    //get all products from user
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })
    //reduce array to just updates
    const updates = products.reduce((allUpdates, product)=> {
        return [...allUpdates,...product.updates]
    },[])
    //find product with the desired id we want
    const match = updates.find(update => update.id === req.params.id)

    if (!match){
        //handle this
        return res.json({message: 'nope'})
    }
    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data:updatedUpdate})
}

export const deleteUpdate = async(req,res)=>{
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })
    
    const updates = products.reduce((allUpdates, product)=> {
        return [...allUpdates,...product.updates]
    },[])

    const match = updates.find(update => update.id === req.params.id)

    if (!match){
        //handle this
        return res.json({message: 'nope'})
    }
    const deletedUpdate = await prisma.update.delete({
        where:{
            id: req.params.id
        }
    })

    res.json({data:deletedUpdate})
}