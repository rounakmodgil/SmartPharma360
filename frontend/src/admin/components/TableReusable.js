import React, { useState } from "react";
import { FaEye, FaPlus, FaThumbsUp, FaTrashAlt } from "react-icons/fa";
import { CSVLink, CSVDownload } from "react-csv";
import Popup from "./Popup";
import "./TableReusable.css";
import { useMutation } from "@apollo/react-hooks";
import { removeEmployee, removeDesignation } from "../../graphql/websitegql";

function CtfTablelist({ flag, tablelabels, tablelist, history }) {
  const [rmemp] = useMutation(removeEmployee);
  const [rmdes] = useMutation(removeDesignation);
  const [activepage, setActivePage] = useState(1);
  const [trigger, settrigger] = useState(-1);
  const [token, setToken] = useState(null);
  const [deletepost, setDeletePost] = useState(null);
  const handleemployeedelete = (item) => {
    setToken(item);
    settrigger(2);
  };
  const handledesignationdelete = (item) => {
    setDeletePost(item);
    settrigger(4);
   
  };
  const deleteemp = (id) => {
    const res = rmemp({ variables: { id: id } });
    console.log(res);
    if (res) {
      settrigger(-1);
      window.location.reload(false);
    }
  };
  const deletedes = (id) => {
    const res = rmdes({ variables: { id: id } });
    console.log(res);
    if (res) {
      settrigger(-1);
      window.location.reload(false);
    }
  };

  const numberofpages = Math.ceil(tablelist.length / 15);
  return (
    <>
      {flag === "allusers" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 5px ",
            }}
          >
            <CSVLink
              data={tablelist}
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "green",
                height: "30px",
                width: "100px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "12px",
              }}
            >
              Download csv
            </CSVLink>
          </div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist
                .slice((activepage - 1) * 15, activepage * 15)
                .map((item) => {
                  return (
                    <>
                      <tr className="table-data" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name} </td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.designation}</td>

                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "-15px",
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" , marginRight:"10px"}}
                              onClick={() => {
                               history.push(`/adminemployedetails/${item.id}`)
                              }}
                            >
                              <FaEye size={15} color="green" />
                            </div>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleemployeedelete(item);
                              }}
                            >
                              <FaTrashAlt size={15} color="tomato" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px 10px 5px 10px",
            }}
          >
            {numberofpages === 1 && (
              <>
                <p className="table-pageactive">1</p>
              </>
            )}
            {numberofpages === 2 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  1
                </p>
                <p
                  onClick={() => {
                    setActivePage(2);
                  }}
                  className={
                    activepage === 2
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  2
                </p>
              </>
            )}
            {numberofpages === 3 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 1 : activepage - 1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  {activepage === 1 ? 1 : activepage - 1}
                </p>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 2 : activepage);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageunavailable"
                      : "table-pageactive"
                  }
                >
                  {activepage === 1 ? 2 : activepage}
                </p>
                <p
                  onClick={() => {
                    setActivePage(
                      activepage === 1
                        ? 3
                        : activepage + 1 <= numberofpages
                        ? activepage + 1
                        : 1
                    );
                  }}
                  className="table-pageunavailable"
                >
                  {activepage === 1
                    ? 3
                    : activepage + 1 <= numberofpages
                    ? activepage + 1
                    : 1}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {flag === "allposts" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 5px ",
            }}
          >
            <CSVLink
              data={tablelist}
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "green",
                height: "30px",
                width: "100px",
                borderRadius: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "12px",
              }}
            >
              Download csv
            </CSVLink>
          </div>
          <table
            id="ctftable"
            style={{
              width: "100%",
              color: "#ffffff",
            }}
          >
            <tbody>
              <tr className="table-header">
                {tablelabels.map((label) => (
                  <td>{label}</td>
                ))}
              </tr>
              {tablelist
                .slice((activepage - 1) * 15, activepage * 15)
                .map((item) => {
                  return (
                    <>
                      <tr className="table-data" key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name} </td>

                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{ marginLeft: "10px", cursor: "pointer" }}
                              onClick={() => {
                                handledesignationdelete(item);
                              }}
                            >
                              <FaTrashAlt size={15} color="tomato" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px 10px 5px 10px",
            }}
          >
            {numberofpages === 1 && (
              <>
                <p className="table-pageactive">1</p>
              </>
            )}
            {numberofpages === 2 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  1
                </p>
                <p
                  onClick={() => {
                    setActivePage(2);
                  }}
                  className={
                    activepage === 2
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  2
                </p>
              </>
            )}
            {numberofpages === 3 && (
              <>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 1 : activepage - 1);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageactive"
                      : "table-pageunavailable"
                  }
                >
                  {activepage === 1 ? 1 : activepage - 1}
                </p>
                <p
                  onClick={() => {
                    setActivePage(activepage === 1 ? 2 : activepage);
                  }}
                  className={
                    activepage === 1
                      ? "table-pageunavailable"
                      : "table-pageactive"
                  }
                >
                  {activepage === 1 ? 2 : activepage}
                </p>
                <p
                  onClick={() => {
                    setActivePage(
                      activepage === 1
                        ? 3
                        : activepage + 1 <= numberofpages
                        ? activepage + 1
                        : 1
                    );
                  }}
                  className="table-pageunavailable"
                >
                  {activepage === 1
                    ? 3
                    : activepage + 1 <= numberofpages
                    ? activepage + 1
                    : 1}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {trigger === 2 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h2 className="popup-title">
            Are you sure you want to delete the employee
          </h2>
          <p className="popup-message">{token.name} </p>
          <p className="popup-message">{token.email} </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                deleteemp(token.id);
              }}
              style={{
                color: "white",
                backgroundColor: "tomato",
                height: "30px",
                width: "70px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                borderWidth: "0px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </Popup>
      )}

      {trigger === 4 && (
        <Popup trigger={true} setTrigger={settrigger}>
          <h2 className="popup-title">
            Are you sure you want to delete this designation?
          </h2>
          <p className="popup-message">{deletepost.id} </p>
          <p className="popup-message">{deletepost.name} </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                deletedes(deletepost.id);
              }}
              style={{
                color: "white",
                backgroundColor: "tomato",
                height: "30px",
                width: "70px",
                fontFamily: "sans-serif",
                fontSize: "12px",
                borderWidth: "0px",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </Popup>
      )}
    </>
  );
}

export default CtfTablelist;
