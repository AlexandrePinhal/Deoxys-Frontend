import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FournisseursList = () => {
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/fournisseurs/", {
      headers: { Authorization: localStorage.getItem("token")
      ? `Basic ${localStorage.getItem("token")}`
      : undefined,}
    })
      .then((response) => response.json())
      .then((fournisseurs) => {
        setFournisseurs(fournisseurs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleProviderDeletion(e, i, index) {
    e.preventDefault(e);
    let temp = fournisseurs;
    temp.splice(index, 1);
    setFournisseurs([...temp]);
    fetch(`http://176.136.89.140:5000/fournisseurs/${i}`, {
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
    <div>
      {fournisseurs.map((fournisseur, index) => {
        return (
          <div key={fournisseur.id} className="fournisseur-info">
            <h3>{fournisseur.name}</h3>
            <p>Adresse: {fournisseur.address}</p>
            <p>Téléphone: {fournisseur.phone}</p>
            <p>Email: {fournisseur.email}</p>
            <button
              className="buttonDeletion"
              onClick={(e) => {
                handleProviderDeletion(e, fournisseur.id, index);
              }}
            ></button>
          </div>
        );
      })}
    </div>
  );
};

export default FournisseursList;
