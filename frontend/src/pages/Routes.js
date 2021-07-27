import React from "react";
import "./Routes.css";
import ScrolltoTop from "./components/ScrolltoTop";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainLanding from "./MainLanding";
import AddEmployee from "../admin/adminaddemployee"
import Login from "./Login";
import AdminUsers from "../admin/adminusers";
import AdminPosts from "../admin/adminposts";
import AddDesignation from "../admin/adminadddesignation";
import AdminEmployeeDetails from "../admin/adminemployeedetails";


function Landing() {
  return (
    <>
      <Router>
        <ScrolltoTop />
        <Switch>
          <Route path="/" exact component={MainLanding} />
          <Route path="/bleeblue" exact component={Login} />         
          <Route path="/adminemployees" exact component={AdminUsers} />
          <Route path="/admindesignations" exact component={AdminPosts} />
          <Route path="/adminaddemployee" exact component={AddEmployee} />
          <Route path="/adminadddesignation" exact component={AddDesignation} />
          <Route path="/adminemployedetails/:id" exact component={AdminEmployeeDetails} />

        </Switch>
      </Router>
    </>
  );
}

export default Landing;
