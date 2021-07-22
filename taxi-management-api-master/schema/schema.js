const graphql = require("graphql");

const { GraphQLSchema } = graphql;

const graphQuery = require("./query");
const mutation = require("./mutation");

module.exports = new GraphQLSchema({
  query: graphQuery.RootQuery,
  mutation: mutation,
});
