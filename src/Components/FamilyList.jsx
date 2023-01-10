import React, { useState, useEffect } from "react";
import "../Style/Families.css";
import { toast } from "react-toastify";

const FournisseursList = () => {
  const [familles, setFamilles] = useState([]);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/families/", {
      headers : { Authorization: localStorage.getItem("token")
      ? `Basic ${localStorage.getItem("token")}`
      : undefined,}
    })
      .then((response) => response.json())
      .then((familles) => {
        setFamilles(familles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleFamilleDeletion(e, i, index) {
    e.preventDefault(e);
    let temp = familles;
    temp.splice(index, 1);
    setFamilles([...temp]);
    fetch(`http://176.136.89.140:5000/families/${i}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
        ? `Basic ${localStorage.getItem("token")}`
        : undefined,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        toast.success("Deleted!");
      } else {
        toast.error("Error");
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
                handleFamilleDeletion(e, famille.id, index);
              }}
            ></button>
          </div>
        );
      })}
    </div>
  );
};

export default FournisseursList;
