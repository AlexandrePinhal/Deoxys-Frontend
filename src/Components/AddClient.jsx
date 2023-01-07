import React, { useState } from "react";
import "../Style/AddClient.css";
import { Role } from "../Pages/App";

const AddClientForm = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  //   const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://176.136.89.140:5000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nom + " " + prenom,
        email,
        password,
        role: Role.Admin,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
    setNom("");
    setPrenom("");
    // setTelephone("");
    setEmail("");
    setPassword("");
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
      {/* <div className="form-group">
        <label htmlFor="telephone">Téléphone</label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
      </div> */}
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
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button>Ajouter</button>
    </form>
  );
};

export default AddClientForm;
