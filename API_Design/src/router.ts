import {Router} from 'express'
import {body, oneOf} from "express-validator"
import { handleInputErrors } from './modules/middleware'
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product'
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
router.get('/update', ()=>{})
router.get('/update/:id', ()=>{ })
router.put('/update/:id', 
    body('title').optional(), 
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']),
    body('version').optional(),
    ()=>{}
    )
router.post('/update',    
//  title is needed
    body('title').exists().isString(), 
    body('body').exists().isString(),
    ()=>{})
router.delete('/update/:id', ()=>{})

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

export default router