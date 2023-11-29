import {Router} from 'express'
import {body, oneOf} from "express-validator"
import { handleInputErrors } from './modules/middleware'
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product'
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
//
const router = Router()
/**
 * Product
 */
router.get('/product', getProducts)
//:id means its a variable- we don't know the value
router.get('/product/:id', getOneProduct)
//body - req.body should have a field in it called name and if it doesn't we'll know via validation result(in middelware.ts)
//the middleware wants the creators to handle that error so it will just pass the whole req object like that
//body('name') attaches something to the req, where validationResult will check if it has what it needs like 'name'
router.put('/product/:id', body('name').isString(), handleInputErrors, (req,res)=> {

})
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Update
 */
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id', 
    body('title').optional(), 
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate
    )
router.post('/update',    
//  title is needed
    body('title').exists().isString(), 
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)
router.delete('/update/:id', deleteUpdate)

/**
 * Update Point
 */
router.get('/updatepoint', ()=>{})
router.get('/updatepoint/:id', ()=>{ })
    router.put('/updatepoint/:id', 
    body('name').optional().isString(), 
    body('description').optional().isString() ,
    ()=>{}
)
router.post('/updatepoint', 
    body('name').optional().isString(), 
    body('description').optional().isString(),
    body('updateId').exists().isString(),
    ()=>{}
)
router.delete('/updatepoint/:id', ()=>{})
//used to test character limit with    `POST api/product {name: longer than 255} test, since this is a subrouter, it won't go to the main router
//becuz the handlers for all the resources that aren't user are in the subrouter, their errors are gonna bubble up to the main routers error handling
//so if you have a subrouter you also have to add an error handler for that router at the bottom of those routes as well (in this case here)
router.use((err,req,res,next)=>{
    console.log(err)
    res.json({messgae: 'in router handler'})
})
export default router