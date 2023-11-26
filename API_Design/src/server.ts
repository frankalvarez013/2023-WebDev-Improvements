import express from 'express'
import router from './router'

const app = express()

app.get('/', (req,res)=>{
    console.log('hello from express')
    res.status(200)
    res.json({message: 'hello'})
    // you can send a bunch of stuff back
    // like html file text/ an image
    // a server can send pretty much anything
})

export default app