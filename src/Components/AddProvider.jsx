import React, { useState } from "react";
import "../Style/AddProvider.css";

const AddFournisseurForm = () => {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nom, email, telephone, adresse)
    fetch("http://176.136.89.140:5000/fournisseurs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nom,
        address : adresse,
        phone : telephone,
        email,
      })
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
    setNom("");
    setAdresse("");
    setTelephone("");
    setEmail("");
  };

  return (
    <form className="add-fournisseur-form" onSubmit={handleSubmit}>
      <h2>Ajouter un fournisseur</h2>
      <div className="form-group">
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="adresse">Adresse</label>
        <input
          type="text"
          id="adresse"
          name="adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="telephone">Téléphone</label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button>Ajouter</button>
    </form>
  );
};

export default AddFournisseurForm;
