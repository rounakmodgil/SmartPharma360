import { gql } from "@apollo/client";

const me = gql`
  query {
    me
  }
`;

const login = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;
const logout = gql`
  mutation {
    logout
  }
`;


const findallemployee = gql`
  query {
    findallemployee {
      id
      name
      email
      phone
      designation
    }
  }
`;
const findalldesignation = gql`
  query {
    findalldesignation {
      id
      name
      
    }
  }
`;
const revokeRefreshToken = gql`
  mutation ($userId: String) {
    revokeRefreshToken(userId: $userId)
  }
`;
const removeDesignation=gql`
mutation($id:String){
  removeDesignation(id:$id)
}
`;

const removeEmployee=gql`
mutation($id:String){
  removeEmployee(id:$id)
}
`;
const createDesignation=gql`
mutation($name:String!){
  createDesignation(name:$name){
    id
 
  }
}
`;

const createEmployee=gql`
mutation($name:String!, $phone:String!, $email:String!, $designation:String!){
  createEmployee(name:$name, phone:$phone, email:$email, designation:$designation ){
    id

  }
}
`;

const findoneemployee=gql`
query($id:String){
  findoneemployee(id:$id){
    id
    name
    phone
    email
    designation
  }
}
`;

const updateEmployee=gql`
mutation($id:String!,$name:String!, $phone:String!, $email:String!, $designation:String!){
  updateEmployee(id:$id,name:$name, phone:$phone, email:$email, designation:$designation )

}
`;

export {
  me,
  login,
  logout,
  revokeRefreshToken,
  findallemployee,
  findalldesignation,
  removeDesignation,
  removeEmployee,
  createDesignation,
  createEmployee,
  findoneemployee,
  updateEmployee
};
