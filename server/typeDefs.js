const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: ID
    findallemployee:[Employee]
    findalldesignation:[Designation]
    findoneemployee(id:String):Employee
  }
  type Employee {
    id: ID!
    name: String!
    phone: String!
    email: String!
    designation: String!
  }
  type Designation {
    id: ID!
    name: String!
  }
  type LoginResponse {
    accessToken: String!
    userId: ID!
  }
  
  type Mutation {
    updateEmployee(id:String!,name: String!,phone: String!, email: String!,designation: String!):Boolean!
    removeDesignation(id: String):Boolean!
    removeEmployee(id: String):Boolean!
    create(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): LoginResponse
    revokeRefreshToken(userId: String!): Boolean!
    logout: Boolean!
    createEmployee(name: String!,phone: String!, email: String!,designation: String!):Employee!
    createDesignation(name: String!):Designation
  }
  
`;
module.exports = { typeDefs };
