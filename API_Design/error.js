setTimeout(()=>{
    throw new Error('oops')
},300)
//process is an object that represents the current rpcoess that you are in - the file system, the variables, teh secrents, the metdata, hardware, ip addres 
//everythin
process.on('uncaughtException', ()=>{

})

process.on('unhandledRejection',()=>{
    
})