import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createDesignation,me } from "../graphql/websitegql";
function AddDesignation({ history }) {
  const [name, SetName] = useState("");
  const [createdes, res] = useMutation(createDesignation);
  const { data: userid, error: userid_error } = useQuery(me);

  useEffect(() => {
  
    if (userid_error) {
      history.push("/");
    } 
  }, [ userid_error]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const res = createdes({
      variables: {
        name,
      },
    });
    if (res) console.log("added flash");
  };

  return (
    <>
    {userid && 
    <div>
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
                Add New Designation
              </h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    required
                    name="name"
                    label="Designation Name"
                    variant="filled"
                    value={name}
                    placeholder="Designation Name"
                    onChange={(e) => {
                      SetName(e.target.value);
                    }}
                  />
                </div>
                <div style={{marginTop:"20px"}}>
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
      
    </div>
}
    </>
  );
}

export default AddDesignation;
