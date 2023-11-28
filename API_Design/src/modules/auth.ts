import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
//helper function
//password - plain-text password that someone is trying
//to sign into and compare to hashedP that is saved in the Db to see
//if they are the same
export const comparePasswords = (password,hashP)=>{
    return bcrypt.compare(password, hashP)
    //will return true or false
}

//helper function
export const hashPassword = (password) =>{
    //salt - ingrdeient - hashing is an algo that spits out
    //a deterministic val based off some input
    //salt is an extra varaible to provide dif variety
    //of that val. salt(5) is the second argument below
    return bcrypt.hash(password, 5)
}

//convert obj to string
//get - unique about user - primary key
export const createJWT = (user) =>{
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },
    process.env.JWT_SECRET
    )
    return token
}

//we want to create a middleware that will set in front of any route that we do not want anyone that shouldn't have it can't access
//called on index.js so that each req has to come from a signed individual
export const protect = (req,res,next) =>{
    //because we are making the server we are making the rules
    //you have to pass me thru the authorization header
    //methods - POST, PATCH, DELETE, GET
    //routes - /'whatever'
    //header - is just another place where you can add another option
    //header - headers are key vlues - key is the name of the header, value is hte value of the header
    //cache control, issuer, metadata of the request
    const bearer = req.headers.authorization
    //authentication design pattern or scheme in HTTP (basicall) one of them is called bearer
    //bearer- egeneric way of describing someone having the ability to asend up a token and that tkoen can be any kind - JSON, API, access token
    //just means you put the name bearer in front of the token - abit silly
    if (!bearer){
        res.status(401)
        res.json({message: 'not authorized'})
        return
    }

    const [,token] = bearer.split(' ') //"Bearer tokenity" should separete
    if (!token){
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }
    //we try to verify this token with the secret we signed the token with
    //if its a user
    //so anything in the stack can now do req.user and can see the user doing
    //the request.
    try {
        //verify this token with this secret
        //token that we got from client
        const user = jwt.verify(token,process.env.JWT_SECRET)
        //augmented user should be the object that we signed on createJWT()
        // with id and user
        req.user = user
        next()
    //use catch to not crash server
    } catch (e){
        console.log(e)
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }
}