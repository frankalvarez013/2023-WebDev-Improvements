const http = require('http')

//server - computer connected to internet
//http - req to do something in the server and client can be anything connected to the internet
const server = http.createServer(
    //route handler - function that responds to an event
    //where you are talking to the database
    async(req,res)=>{
        if (req.method === 'GET' && req.url === '/'){
            res.end();
        }
    })

server.listen(3001, ()=>{
    console.log('server on http://localhost:3001')
})

//we are not using this anymore because we get to
// use express now!
