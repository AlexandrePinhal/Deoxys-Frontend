import React from "react";
import '../Style/Families.css'

const famillesJSON = require("../Families.json");

const FournisseursList = () => {
  return (
    <div className="families-wrapper">
      {famillesJSON.map((famille, index) => {
        return (
          <div key={index} className="families-info">
            <h3>{famille.type}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default FournisseursList;