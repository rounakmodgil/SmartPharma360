import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { MenuItem, TextareaAutosize } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createEmployee, findalldesignation,me } from "../graphql/websitegql";
function AddEmployee({ history }) {
  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [email, Setemail] = useState("");
  const [designation, Setdesignation] = useState("");
  const { data } = useQuery(findalldesignation, {
    fetchPolicy: "network-only",
  });
  const [createemp, res] = useMutation(createEmployee);
  const { data: userid, error: userid_error } = useQuery(me);

  useEffect(() => {
  
    if (userid_error) {
      history.push("/");
    } 
  }, [ userid_error]);
  const handleSubmit = (e) => {
    e.preventDefault();

    createemp({
      variables: {
        
        name,
        phone,
        email,
        designation,
      },
    }).then((res) => {
      console.log(res);
      console.log("employee added");
    });
  };

  return (
    <>
    {userid &&
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <Header />
          <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}>
            <Container>
              <h2
                style={{
                  marginBottom: "20px",
                  paddingTop: "20px",
                  color: "#555",
                }}
              >
                Add New Employee
              </h2>
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

                <div style={{ marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Add
                  </Button>
                </div>
              </form>
            </Container>
          </div>
          <Footer />
        </div>
      </div>
}
    </>
  );
}

export default AddEmployee;
