import * as user from '../user'
//these will all be global so we don't need to import anything, they will be given to us on runtime
// describe('user handler', ()=>{
//     //it should do something when something happens
//     //we can use test() or it() -same thing
//     it('should do something when something happens',()=>{
//         expect(1).toBe(1);
//     })
// })

describe('user handler', ()=>{
    it('should create a new user', async()=>{
        //mocking basically you can just mock the data that needs to be passed into the parameters of the method,
        //basic way - look at what the function is asking and insert them into the parameters.
        const req = {body: {username: 'hello', password:'hi'}}
        const res = {json(token){
            console.log(token)
            expect(token).toBeTruthy()
        }}

        await user.createNewUser(req,res,()=>{})
    })
})

