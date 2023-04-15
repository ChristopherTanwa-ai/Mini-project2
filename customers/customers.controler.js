import * as customerModel from "./customers.model.js";

export async function getAllCustomers(req, res) {
    try {
        let allCustomers = await customerModel.getAll();
        res.json(allCustomers);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

export async function postCustomer(req, res) {
    try {
      let newCustomer = req.body;
      await customerModel.add(newCustomer);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  export async function getCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = await customerModel.getByID(id);
      res.json(customer);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function putCustomer  (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = req.body;
      await customerModel.update(id, customer);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function deleteCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      await customerModel.remove(id);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function addToBasket(req, res) {
    try {
      const customerId = req.params.customerId;
      const posterId = req.params.posterId;
      const customer = await customerModel.addToBasket(customerId, posterId);
      res.json(customer);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  export async function getBasket(req, res) {
    try {
      const customerId = req.params.customerId;
      const basket = await getBasket(customerId);
      res.json(basket);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  export async function removeFromBasket(req, res) {
    try {
      const customerId = parseInt(req.params.customerId);
      const posterId = req.params.posterId;
      const customer = await customerModel.getByID(customerId);
      if (!customer) {
        throw new Error('Customer not found');
      }
      const posterIndex = customer.basket.findIndex(p => p.id === posterId);
      if (posterIndex === -1) {
        throw new Error('Poster not found in basket');
      }
      customer.basket.splice(posterIndex, 1);
      await customerModel.update(customerId, customer);
      res.json(customer.basket);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

