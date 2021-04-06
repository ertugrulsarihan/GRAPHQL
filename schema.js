const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const axios = require("axios");

const Person = new GraphQLObjectType({
  name: "Personel",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    personel: {
      type: Person,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return axios
          .get("http://localhost:3000/persons/" + args.id)
          .then((res) => res.data);
      },
    },
    personals: {
      type: GraphQLList(Person),
      resolve(parents, args) {
        return axios
          .get("http://localhost:3000/persons")
          .then((res) => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPerson: {
      type: Person,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent,args){
        return axios.post("http://localhost:3000/persons",{
          name:args.name,
          email:args.email,
          age:args.age
        }).then(res=>res.data)
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation:mutation
});
