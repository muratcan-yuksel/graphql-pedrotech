//write an express server
const express = require("express");
const app = express();
const port = 3000;
const userData = require("./MOCK_DATA.json");
const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
