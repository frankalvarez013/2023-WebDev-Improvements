//use prisma SDK/ORM
import prisma from '../db'
import { comparePasswords, hashPassword } from '../modules/auth'
import { createJWT } from '../modules/auth'
//handler for a route
//handlers have a req,they have a res
export const createNewUser = async (req,res,next)=>{
    try {
        const user = await prisma.user.create({
            //we know what the data needs to be based
            //on schema from db
            //anything that doesn't have a @default
            //needs to be inside this data
            //and the Product[] doesn't have to be added
            //since its an empty array - alr intialized
            data: {
                //as the author of the server
                //you client must send us something
                //called username attached to the body
                username: req.body.username,
                // we want db to save a hashed password
                password: await hashPassword(req.body.password)
            }
        })
        const token = createJWT(user)
        res.json({token})
        //this will then be sent to the next middleware which is on server where we specify on app.use what type of error it is
    } catch(e) {
        e.type = 'input'
        next(e)
    }
    
   
}

export const signin = async (req,res)=>{
    //we don't send in password cuz the passed in ps
    //won't be hashed and the one in the db is.
    //we could always hash inside the password and isnert
    //in the password: hash(req.ps)
    //but that would be too much indexing
    //as in looking for a password in all accounts
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    })
    const isValid = await comparePasswords(req.body.password,user.password)

    if(!isValid){
        res.status(401)
        res.json({message: 'nope'})
        return
    }
    const token = createJWT(user)
    res.json({token})
}