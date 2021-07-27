const { Admin, Designation, Employee } = require("./models/User");
const { hash, compare } = require("bcryptjs");
const { createAccessToken, createRefeshToken } = require("./auth");
const { sendRefreshToken } = require("./sendRefreshToken");
const { getcurrUser, setCurrUser } = require("./currUser");

const resolvers = {
  Query: {
    me: () => getcurrUser(),
    findallemployee: () => Employee.find(),
    findalldesignation: () => Designation.find(),
    findoneemployee:async(_,{id})=>{
      const emp = Employee.findById(id);
      if (!emp) throw new Error("employee not found");
      return emp;
    }
  },
  Mutation: {
    
    updateEmployee: async (_, { id , name, email, phone, designation}) => {
      const emp = Employee.findById(id);
      if (!emp) throw new Error("employee not found");
      try {
        await Employee.findByIdAndUpdate(id,{name, email, phone, designation});
      } catch (err) {
        return false;
      }
      return true;
    },
    removeDesignation: async (_, { id }) => {
      const des = Designation.findById(id);
      if (!des) throw new Error("designation not found");
      try {
        await Designation.findByIdAndDelete(id);
      } catch (err) {
        return false;
      }
      return true;
    },
    removeEmployee: async (_, { id }) => {
      const emp = Employee.findById(id);
      if (!emp) throw new Error("employee not found");
      try {
        await Employee.findByIdAndDelete(id);
      } catch (err) {
        return false;
      }
      return true;
    },
    createEmployee: async (_, {name, phone, email, designation }) => {
     
      const emp = new Employee({ name, phone, email, designation });
      try {
        await emp.save();
      } catch (err) {
        console.log(err);
        return emp;
      }
      return emp;
    },
    createDesignation: async (_, {name }) => {
     
      const des = new Designation({ name });
      try {
        await des.save();
      } catch (err) {
        console.log(err);
        return designation;
      }
      return des;
    },

    create: async (_, { email, password }) => {
      const hashedPassword = await hash(password, 12);
      const admin = new Admin({ email, password: hashedPassword });
      try {
        await admin.save();
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },

    login: async (_, { email, password }, { res }) => {
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        throw new Error("could not find the user");
      }
      const valid = await compare(password, admin.password);
      if (!valid) {
        throw new Error("bad password");
      }
      //login succesfull
      setCurrUser(admin.id);
      sendRefreshToken(res, createRefeshToken(admin));
      return { accessToken: createAccessToken(admin), userId: admin.id };
    },
    logout: async (_, {}, { res }) => {
      setCurrUser(null);
      sendRefreshToken(res, " ");
      return true;
    },

    revokeRefreshToken: async (_, { userId }) => {
      const User = await Users.findByIdAndUpdate(userId, {
        $inc: { tokenVersion: 1 },
      });
      if (!User) {
        throw new Error("could not find the user");
      }
      return true;
    },
  },
};
module.exports = { resolvers };
// $inc: { tokenVersion: 1 }
// const User = await Users.findOneAndUpdate(
//   { id: userId },
//   { email: "boob@boob.com" },
//   { new: true, useFindAndModify: false },
//   (err, data) => {
//     if (err) console.log(err);
//     if (data) console.log(data);
//   }
// );
// if (!User) return false;
// return true;



