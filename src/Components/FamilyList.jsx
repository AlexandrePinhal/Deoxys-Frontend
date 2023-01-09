import React, { useState, useEffect } from "react";
import "../Style/Families.css";

const FournisseursList = () => {
  const [familles, setFamilles] = useState([]);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/families/")
      .then((response) => response.json())
      .then((familles) => {
        setFamilles(familles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleFamilleDeletion(e, i) {
    e.preventDefault(e);
    let temp = familles
    temp.splice(i, 1);
    setFamilles([...temp]);
    fetch(`http://176.136.89.140:5000/families/${i}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  return (
    <div className="families-wrapper">
      {familles.map((famille, index) => {
        return (
          <div key={famille.id} className="families-info">
            <h3>Famille : {famille.name}</h3>
            <button
              className="buttonDeletion"
              onClick={(e) => {
                handleFamilleDeletion(e, famille.id);
              }}
            ></button>
          </div>
        );
      })}
    </div>
  );
};

export default FournisseursList;
