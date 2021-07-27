import React, { Component } from "react";

import "./Home.css";
import Button from "@material-ui/core/Button";

function Home({ history }) {
  return (
    <>
      <div
        style={{
          flex:1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf:"centere"
        }}
      ><div style={{alignItems:"center"}}>
        <h1>Demo Project</h1>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              history.push("/bleeblue");
            }}
          >
            GO
          </Button>
        </div>
        </div>
      </div>
    </>
  );
}

export default Home;
