import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./Home";

import Loading from "./images/Hourglass.gif";


function MainLanding({history}) {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, 2000);
  }, []);
  return (
    <>
      {!animating && (
        <>
          <Navbar />
          <Home history={history}/>
          
        </>
      )}
      {animating && (
        <div
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <img src={Loading} style={{ height: "45px", width: "40px" }} />
        </div>
      )}
    </>
  );
}

export default MainLanding;
