import React, { useState } from "react";
import "../Style/AddClient.css"

const AddClientForm = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // appeler la fonction pour ajouter un client au JSON
    // addClient(
    //   nom,
    //   prenom,
    //   telephone,
    //   email
    // );
    // remettre les champs à vide
    setNom("");
    setPrenom("");
    setTelephone("");
    setEmail("");
  };

  return (
    <form className="add-client-form" onSubmit={handleSubmit}>
      <h2>Ajouter un client</h2>
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
        <label htmlFor="prenom">Prénom</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
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

export default AddClientForm;
