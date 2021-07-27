import React, { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TableReusable from "./components/TableReusable";
import { findallemployee, me } from "../graphql/websitegql";
function AdminUsers({ history }) {
  const [dashboardusers, { data }] = useLazyQuery(findallemployee, {
    fetchPolicy: "network-only",
  });
  const { data: userid, error: userid_error } = useQuery(me);
  const tablelabels = ["ID", "Name", "Phone", "Email","Designation", " "];
  useEffect(() => {
    if (userid) {
      dashboardusers();
    }
    if (userid_error) {
      history.push("/");
    } 
  }, [userid, userid_error]);

  return (
    <>
      {userid && (
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ width: "100%" }}>
            <Header history={history} />
            <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#fff",
                }}
              >
                {data && console.log(data.findallemployee)}
                {data && (
                  <TableReusable
                    flag="allusers"
                    tablelabels={tablelabels}
                    tablelist={data.findallemployee}
                    history={history}
                  ></TableReusable>
                )}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminUsers;
