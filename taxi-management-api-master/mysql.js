const mysql = require("mysql");
const util = require("util");

const taxiQueries = require("./query/taxiQueries");
const driverQueries = require("./query/driverQueries");
const ownerQueries = require("./query/ownerQueries");
const transactionQueries = require("./query/transactionQueries");
const customerQueries = require("./query/customerQueries");
const orderQueries = require("./query/orderQueries");
const expenseQueries = require("./query/expenseQueries");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
connection.connect((err) => {
  if (!err) {
    console.log("connected");
  } else {
    console.log(err);
  }
});

connection.query(taxiQueries.createTaxitbl(), (err, results, fields) => {
  if (err) {
    console.log(err);
  }
  console.log("taxi tbl created..");
});

connection.query(driverQueries.createDrivertbl(), (err, results, fields) => {
  if (err) {
    console.log(err);
  }
  console.log("driver tbl created..");
});

connection.query(ownerQueries.createOwnertbl(), (err, results, fields) => {
  if (err) {
    console.log(err);
  }
  console.log("owner tbl created..");
});

connection.query(
  transactionQueries.createTransactionTable(),
  (err, result, fields) => {
    if (err) {
      console.log(err);
    }
    console.log("trans. tbl created..");
  }
);

connection.query(customerQueries.createCustomertbl(), (err, result, fields) => {
  if (err) {
    console.log(err);
  }
  console.log("cust. tbl created..");
});

connection.query(orderQueries.createOrdertbl(), (err, result, fields) => {
  if (err) {
    console.log(err);
  }
  console.log("order tbl created..");
});

connection.query(expenseQueries.createExpensetbl(), (err, result, fields) => {
  if (err) {
    console.log(err);
  }
  console.log("exp. tbl created..");
});

module.exports = util.promisify(connection.query).bind(connection);
