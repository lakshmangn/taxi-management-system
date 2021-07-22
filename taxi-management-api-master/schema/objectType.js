const graphql = require("graphql");

const query = require("../mysql");

const taxiQueries = require("../query/taxiQueries");
const driverQueries = require("../query/driverQueries");
const ownerQueries = require("../query/ownerQueries");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
} = graphql;

const TaxiType = new GraphQLObjectType({
  name: "Taxi",
  fields: () => ({
    id: { type: GraphQLID },
    ownerid: { type: GraphQLString },
    number: { type: GraphQLString },
    model: { type: GraphQLString },
    overview: { type: GraphQLString },
    seatingCapacity: { type: GraphQLInt },
    driverid: { type: GraphQLString },
    driver: {
      type: DriverType,
      async resolve(parent, args) {
        try {
          const data = await query(driverQueries.getDriver(parent.driverid));
          console.log(data);
          return data[0];
        } catch (err) {
          console.log(err);
        }
      },
    },
    owner: {
      type: OwnerType,
      async resolve(parent, args) {
        try {
          const data = await query(ownerQueries.getOwner(parent.ownerid));
          console.log(data);
          return data[0];
        } catch (err) {
          console.log(err);
        }
      },
    },
  }),
});

const DriverType = new GraphQLObjectType({
  name: "Driver",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contactno: { type: GraphQLString },
    address: { type: GraphQLString },
    age: { type: GraphQLInt },
    drivingLicense: { type: GraphQLBoolean },
    taxis: {
      type: new GraphQLList(TaxiType),
      async resolve(parent, args) {
        try {
          const data = await query(taxiQueries.getByDriver(parent.id));
          console.log(data);
          return data;
        } catch (err) {
          console.log(err);
        }
      },
    },
  }),
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contactno: { type: GraphQLString },
    address: { type: GraphQLString },
    age: { type: GraphQLInt },
    taxis: {
      type: new GraphQLList(TaxiType),
      async resolve(parent, args) {
        try {
          const data = await query(taxiQueries.getByOwner(parent.id));
          console.log(data);
          return data;
        } catch (err) {
          console.log(err);
        }
      },
    },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    contactno: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
});

const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  }),
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    pickupAdd: { type: GraphQLString },
    destinationAdd: { type: GraphQLString },
    amount: { type: GraphQLInt },
    transactionid: { type: GraphQLString },
    customerid: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

const ExpenseType = new GraphQLObjectType({
  name: "Expense",
  fields: () => ({
    id: { type: GraphQLID },
    driverid: { type: GraphQLString },
    transactionid: { type: GraphQLString },
    taxiid: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = {
  TaxiType,
  DriverType,
  OwnerType,
  TransactionType,
  CustomerType,
  ExpenseType,
  OrderType,
};
