// index.js
import express from 'express'
import {getAllCustomers, postCustomer, getCustomer,putCustomer, deleteCustomer, getBasket, removeFromBasket, addToBasket } from './customers.controler.js'

export const customerRouter = express.Router();

// middleware specific to this route
customerRouter.use(express.json())

// route handlers
customerRouter.get("/customers", getAllCustomers);

customerRouter.post("/customers", postCustomer);

customerRouter.get("/customers/:id", getCustomer);

customerRouter.put("/customers/:id",putCustomer );

customerRouter.delete("/customers/:id", deleteCustomer);

customerRouter.put('/customers/:customerId/basket/:posterId', addToBasket);

customerRouter.put('/customers/:customerId/basket2/:posterId', removeFromBasket);

customerRouter.get('/customers/:customerId/basket', getBasket);