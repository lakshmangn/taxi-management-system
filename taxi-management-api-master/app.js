const express = require("express");
const taxiRouter = require("./router/taxiRouter");
var graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "route not handled",
  });
});

module.exports = app;
