import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { MenuItem, TextareaAutosize } from "@material-ui/core";
import {
  findoneemployee,
  findalldesignation,
  updateEmployee,
  me
} from "../graphql/websitegql";
import { FaUser } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import Popup from "./components/Popup";
import TextField from "@material-ui/core/TextField";
function AdminEmployeeDetails({ history }) {
  let { id } = useParams();
  const [trigger, settrigger] = useState(-1);


  const { data: empdata } = useQuery(findoneemployee, {
    variables: { id },
    fetchPolicy:"network-only"
  });
  const [updateemp] = useMutation(updateEmployee);
  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [email, Setemail] = useState("");
  const [designation, Setdesignation] = useState(
""
  );

  
  const { data } = useQuery(findalldesignation, {
    fetchPolicy: "network-only",
  });
  const { data: userid, error: userid_error } = useQuery(me);

  useEffect(() => {
  
    if (userid_error) {
      history.push("/");
    } 
  }, [ userid_error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const id= empdata.findoneemployee.id;
    updateemp({
      variables: {
       id,
        name,
        phone,
        email,
        designation,
      },
    }).then((res) => {
      console.log(res);
      console.log("employee updated");
      settrigger(-1);
      window.location.reload(false);
    });
  };

  return (
    <>
    {userid &&
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <Header history={history} />
          <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
            <div
              style={{
                marginTop: "100px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>
                <FaUser size={150} color={"gray"} />
              </div>
              {empdata &&
              <div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <p style={{ color: "#555", fontWeight: "bold" }}>
                    Employee ID{" "}
                  </p>
                  <p style={{ color: "#555" }}>
                    {" "}
                    : {empdata.findoneemployee.id}
                  </p>
                </div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <p style={{ color: "#555", fontWeight: "bold" }}>
                    {" "}
                    Employee Name{" "}
                  </p>
                  <p style={{ color: "#555" }}>
                    {" "}
                    : {empdata.findoneemployee.name}
                  </p>
                </div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <p style={{ color: "#555", fontWeight: "bold" }}>
                    {" "}
                    Employee Email{" "}
                  </p>
                  <p style={{ color: "#555" }}>
                    {" "}
                    : {empdata.findoneemployee.email}
                  </p>
                </div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <p style={{ color: "#555", fontWeight: "bold" }}>
                    Employee Phone{" "}
                  </p>
                  <p style={{ color: "#555" }}>
                    {" "}
                    : {empdata.findoneemployee.phone}
                  </p>
                </div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <p style={{ color: "#555", fontWeight: "bold" }}>
                    {" "}
                    Employee Designation{" "}
                  </p>
                  <p style={{ color: "#555" }}>
                    {" "}
                    : {empdata.findoneemployee.designation}
                  </p>
                </div>
              </div>
            }
            </div>
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => {
                  settrigger(1);
                  SetName(empdata.findoneemployee.name);
    SetPhone(empdata.findoneemployee.phone);
    Setemail(empdata.findoneemployee.email);
    Setdesignation(empdata.findoneemployee.designation);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {trigger === 1 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h2 className="popup-title">Edit</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ margin: "15px 0px 15px 0px" }}>
              <TextField
                required
                name="name"
                label="Employee Name"
                variant="filled"
                value={name}
                placeholder="Employee Name"
                onChange={(e) => {
                  SetName(e.target.value);
                }}
              />
            </div>
            <div style={{ margin: "15px 0px 15px 0px" }}>
              <TextField
                required
                name="phone"
                label="Phone Number"
                variant="filled"
                value={phone}
                placeholder="Phone Number"
                onChange={(e) => {
                  SetPhone(e.target.value);
                }}
              />
            </div>
            <div style={{ margin: "15px 0px 15px 0px" }}>
              <TextField
                required
                name="email"
                label="Email"
                variant="filled"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  Setemail(e.target.value);
                }}
              />
            </div>
            <div>
              {data && (
                <TextField
                  style={{ width: "150px" }}
                  id="select"
                  label="Designation"
                  value={designation}
                  name="designation"
                  select
                  onChange={(event) => Setdesignation(event.target.value)}
                >
                  {data.findalldesignation.map((des) => {
                    return <MenuItem value={des.name}>{des.name}</MenuItem>;
                  })}
                </TextField>
              )}
            </div>
          </form>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSubmit}
              style={{
                color: "white",
                backgroundColor: "green",
                height: "30px",
                width: "70px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                borderWidth: "0px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </Popup>
      )}
    </div>
}
</>
  );
}

export default AdminEmployeeDetails;
