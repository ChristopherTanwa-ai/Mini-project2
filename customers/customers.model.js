import * as fs from "fs/promises";
import path from 'path';
const CUSTOMERS_FILE = "./customers.json";
const dataFilePath = path.join(new URL('./data.json', import.meta.url).pathname);

// return all customer from file
export async function getAll() {
  try {
    let customersTxt = await fs.readFile(CUSTOMERS_FILE);
    let customers = JSON.parse(customersTxt);
    return customers;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of customers to file
async function save(customers = []) {
  let customersTxt = JSON.stringify(customers);
  await fs.writeFile(CUSTOMERS_FILE, customersTxt);
}

// test function for customer ID
function findCustomer(customerArray, Id) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}

// get customer by ID
export async function getByID(customerId) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else return customerArray[index];
}

// create a new customer
export async function add(newCustomer) {
  let customerArray = await getAll();
  if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  customerArray.push(newCustomer);
  await save(customerArray);
}

// update existing customer
export async function update(customerId, customer) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray[index] = customer;
    await save(customerArray);
  }
}

export async function addToBasket(customerId, posterId) {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const posters = jsonData.Posters;
    const posterKeys = Object.keys(posters);
    const posterkey = posterKeys[posterId];
    let poster = posters[posterkey]
    let customerArray = await getAll();
    let index = findCustomer(customerArray, customerId);
    let customer = customerArray[index];
    if (!customer || !poster) {
      throw new Error('Invalid customer or poster id');
    }
    customer.Basket.push(poster);
    customerArray[index] = customer;
    await save(customerArray);
  } catch (error) {
    console.error(error);
  }
}

export async function removeFromBasket(customerId, posterId) {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const posters = jsonData.Posters;
    const posterKeys = Object.keys(posters);
    const posterkey = posterKeys[posterId];
    let poster = posters[posterkey];
    let customerArray = await getAll();
    let index = findCustomer(customerArray, customerId);
    let customer = customerArray[index];
    let posterIndex = customer.Basket[poster];
    if (!customer || !poster) {
      throw new Error('Invalid customer or poster id');
    }
    customer.Basket.splice(posterIndex, 1);
    customerArray[index] = customer;
    await save(customerArray);
  }
    catch (error) {
      console.error(error);
    }
  } 


export async function getBasket(customerId) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
  let customer = customerArray[index];
  return customer.basket;}
}


// delete existing customer
export async function remove(customerId) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray.splice(index, 1); // remove customer from array
    await save(customerArray);
  }
}
