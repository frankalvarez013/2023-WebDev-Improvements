import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
const app = express()
//gives us a format to use - dev recommended cuz its better for developers
//app.use() doesn't always have to take a mount to path, it will be global for the whole app (if there isn't a mount like '/api')
//every single api that is being sent here, it has to go thru morgan (and console.log() and calling next())
app.use(morgan('dev'))
//after going thru morgan it will go the the respective api call
//this below allows a client to send us JSON, wihtout this we would have to manually put hte bits together.
app.use(express.json())
//allows client to add things like a query string or parameters and decodes or encodes things as code, cuz if we odn't use it it will treat it as string
//ex 'google.com?a=1,thing=otherthing'
//converts - query.a query.thing
app.use(express.urlencoded({extended: true}))
//Below code -
//any single req thats registered after middleware will now have access to req.shh_secret
app.use((req,res,next)=>{
    req.shhh_secret = 'doggy'
    next()
})
app.get('/', (req,res)=>{
    console.log('hello from express')
    res.status(200)
    res.json({message: 'hello'})
    // you can send a bunch of stuff back
    // like html file text/ an image
    // a server can send pretty much anything
})
//not HTTP - an express features
//use - built into express allows you to apply some global configuration to either whole app or certain JPATH
//so everything that has /API we want to use router
//protect the whole router
app.use('/api',protect, router) //the router will be basically letting us get access to the router handlers
//we know in our router we have a get request for get(/product) if we need to make a get request using /product WRONG, it will
//need url - /api/product because router is mounted on /api.
//we don't use protect because we want everyone to be able to signin/signup
app.post('/user',createNewUser)
app.post('/signin',signin)
export default app