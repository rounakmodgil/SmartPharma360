const mongoose = require("mongoose");
let employeeSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    designation: String,
  },
  { collection: "employee" }
);
let admincredentials = new mongoose.Schema(
  {
    email: String,
    password: String,
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { collection: "admin" }
);

let designationSchema = new mongoose.Schema(
  {
   name:String,
  },
  { collection: "designation" }
);



var Admin = mongoose.model("admin", admincredentials);
var Employee = mongoose.model("employee", employeeSchema);
var Designation = mongoose.model("designation", designationSchema);


module.exports = {
  Employee,
  Designation,
  Admin,

};
