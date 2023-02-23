const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

const UserType = require("./TypeDefs/UserType");
const userData = require("../MOCK_DATA.json");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //this is like, each one of them are rest api endpoints
    getAllUsers: {
      //GraphQLList because we're returning an array of users
      type: new graphql.GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        //here is the part where we actually get the data from the database
        //imagine this part as the equivalent of this in a rest api
        // const getOrders = asyncWrapper(async (req, res) => {
        //     const orders = await Order.find();
        //     res.status(200).json({ success: true, data: orders });
        //   });
        return userData;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return userData.find((user) => user.id === args.id);
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      //if it was a real database we wouldn't need the id as it's created automatically by the db itself
      //but since we're using mock data, we'll need to create an id
      args: {
        // id: { type: GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        //here we would create a new user in the database
        //using the databae's own methods
        const user = {
          //just because our  mock data is structured like that
          //I give the data as the lenght of the data plus 1
          id: userData.length + 1,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
        };
        userData.push(user);
        return user;
      },
      deleteUser: {
        type: UserType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve(parentValue, args) {
          const user = userData.find((user) => user.id === args.id);
          userData.splice(userData.indexOf(user), 1);
          return user;
        },
      },
    },
  },
});

// const schema = new graphql.GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation,
// });

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
