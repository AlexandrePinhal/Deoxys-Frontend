import React from "react";

const fournisseursJSON = require("../Fournisseurs.json");

const FournisseursList = () => {
  return (
    <div>
      {fournisseursJSON.map((fournisseur) => {
        return (
          <div key={fournisseur.id} className="fournisseur-info">
            <h3>{fournisseur.nom}</h3>
            <p>Adresse: {fournisseur.adresse}</p>
            <p>Téléphone: {fournisseur.telephone}</p>
            <p>Email: {fournisseur.email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FournisseursList;
