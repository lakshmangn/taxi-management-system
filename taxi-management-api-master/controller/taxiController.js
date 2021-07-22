const connection = require("../mysql");
const taxiQueries = require("../query/taxiQueries");
const driverQueries = require("../query/driverQueries");
const ownerQueries = require("../query/ownerQueries");
const transactionQueries = require("../query/transactionQueries");
const customerQueries = require("../query/customerQueries");
const ordreQueries = require("../query/orderQueries");
const expenseQueries = require("../query/expenseQueries");

const uniqid = require("uniqid");

exports.createTaxi = async (body) => {
  try {
    console.log(body);
    const data = { id: uniqid("", "-taxi"), ...body };
    await connection(taxiQueries.insertTaxi(data));
    return data;
  } catch (er) {
    console.log(er);
  }
};

exports.createDriver = async (body) => {
  try {
    const data = { id: uniqid("", "-driver"), ...body };
    await connection(driverQueries.insertDriver(data));
    return data;
  } catch (er) {
    console.log(er);
  }
};

exports.createOwner = async (body) => {
  try {
    const data = { id: uniqid("", "-owner"), ...body };
    connection(ownerQueries.insertOwner(data));
    return data;
  } catch (er) {
    console.log(er);
  }
};

exports.createTransaction = async (body) => {
  try {
    const data = { id: uniqid("", "-transaction"), ...body };
    connection(transactionQueries.insertTransaction(data));
    return data;
  } catch (er) {
    console.log(er);
  }
};

exports.createCustomer = async (body) => {
  try {
    const data = { id: uniqid("", "-customer"), ...body };
    connection(customerQueries.insertCustomer(data));
    return data;
  } catch (er) {
    console.log(er);
  }
};

exports.createOrder = async (body) => {
  try {
    const data = { id: uniqid("", "-order"), ...body };
    connection(ordreQueries.insertOrder(data));
    return data;
  } catch (er) {
    console.log(er);
  }
};

exports.createExpense = async (body) => {
  try {
    const data = { id: uniqid("", "-customer"), ...body };
    connection(expenseQueries.insertExpense(data));
    return data;
  } catch (er) {
    console.log(er);
  }
};
