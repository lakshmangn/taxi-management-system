const graphql = require("graphql");

const objectType = require("./objectType");
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;
const taxiQueries = require("../query/taxiQueries");
const driverQueries = require("../query/driverQueries");
const ownerQueries = require("../query/ownerQueries");
const transactionQueries = require("../query/transactionQueries");
const customerQueries = require("../query/customerQueries");
const orderQueries = require("../query/orderQueries");
const expenseQueries = require("../query/expenseQueries");

const query = require("../mysql");

exports.RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    taxi: {
      type: objectType.TaxiType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          const data = await query(taxiQueries.getTaxi(args.id));
          console.log(data);
          return data[0];
        } catch (err) {
          console.log(err);
        }
      },
    },
    driver: {
      type: objectType.DriverType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          const data = await query(driverQueries.getDriver(args.id));
          console.log(data);
          return data[0];
        } catch (err) {
          console.log(err);
        }
      },
    },
    owner: {
      type: objectType.OwnerType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          const data = await query(ownerQueries.getOwner(args.id));
          console.log(data);
          return data[0];
        } catch (err) {
          console.log(err);
        }
      },
    },
    transaction: {
      type: objectType.TransactionType,
      async resolve(parent, args) {
        try {
          const data = await query(transactionQueries.getTransaction(args.id));
          return data[0];
        } catch (er) {
          console.log(er);
        }
      },
    },
    customer: {
      type: objectType.CustomerType,
      async resolve(parent, args) {
        try {
          const data = await query(customerQueries.getCustomer(args.id));
          return data[0];
        } catch (er) {
          console.log(er);
        }
      },
    },
    order: {
      type: objectType.OrderType,
      async resolve(parent, args) {
        try {
          const data = await query(orderQueries.getOrder(args.id));
          return data[0];
        } catch (er) {
          console.log(er);
        }
      },
    },
    expense: {
      type: objectType.ExpenseType,
      async resolve(parent, args) {
        try {
          const data = await query(expenseQueries.getExpense(args.id));
          return data[0];
        } catch (er) {
          console.log(er);
        }
      },
    },
    taxis: {
      type: new GraphQLList(objectType.TaxiType),
      async resolve(parent, args) {
        try {
          return await query(taxiQueries.getAll());
        } catch (er) {
          console.log(er);
        }
      },
    },
    owners: {
      type: new GraphQLList(objectType.OwnerType),
      async resolve(parent, args) {
        try {
          return await query(ownerQueries.getAll());
        } catch (er) {
          console.log(er);
        }
      },
    },
    drivers: {
      type: new GraphQLList(objectType.DriverType),
      async resolve(parent, args) {
        try {
          return await query(driverQueries.getAll());
        } catch (er) {
          console.log(er);
        }
      },
    },
    transactions: {
      type: new GraphQLList(objectType.TransactionType),
      async resolve(parent, args) {
        try {
          return await query(transactionQueries.getAll());
        } catch (er) {
          console.log(er);
        }
      },
    },
    customers: {
      type: new GraphQLList(objectType.CustomerType),
      async resolve(parent, args) {
        try {
          return await query(customerQueries.getAll());
        } catch (er) {
          console.log(er);
        }
      },
    },
    orders: {
      type: new GraphQLList(objectType.OrderType),
      async resolve(parent, args) {
        try {
          return await query(orderQueries.getAll());
        } catch (er) {
          console.log(er);
        }
      },
    },
    expenses: {
      type: new GraphQLList(objectType.ExpenseType),
      async resolve(parent, args) {
        try {
          return await query(expenseQueries.getAll());
        } catch (er) {
          console.log(er);
        }
      },
    },
  },
});
