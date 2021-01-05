import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Loader = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  return (
    <div
      className="loader"
      style={{
        display: "flex",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(128, 128, 128, 0.234)",
      }}
    >
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
