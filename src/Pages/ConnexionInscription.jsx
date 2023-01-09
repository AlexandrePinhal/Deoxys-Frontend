import React, { useState } from "react";
import "../Style/ConnexionInscription.css";
import {Role} from "../Pages/App"

const ConnexionInscription = (props) => {
  const [formulaireActif, setFormulaireActif] = useState("connexion");

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  //   const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
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
        role: Role.User,
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
    <div className="connexion-inscription-container">
      {formulaireActif === "connexion" && (
        <>
          <h1 className="titre">Connexion</h1>
          <div className="connexion-form">
            <input
              type="email"
              placeholder="Adresse e-mail"
              className="modern-input"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="modern-input"
            />
            <button
              className="bouton"
              onClick={() => {
                props.setIsConnected(true);
              }}
            >
              Se connecter
            </button>
          </div>
          <button
            className="boutonAlt"
            onClick={() => setFormulaireActif("inscription")}
          >
            S'inscrire
          </button>
        </>
      )}
      {formulaireActif === "inscription" && (
        <>
          <h1 className="titre">Inscription</h1>
          <div className="inscription-form">
            <input
              type="text"
              placeholder="Nom"
              className="modern-input"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <input
              type="text"
              placeholder="Prénom"
              className="modern-input"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            <input
              type="email"
              placeholder="Adresse e-mail"
              className="modern-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="modern-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bouton"
              onClick={(e) => {
                props.setIsConnected(true);
                handleSubmit(e);
              }}
            >
              S'inscrire
            </button>
          </div>
          <button
            className="boutonAlt"
            onClick={() => setFormulaireActif("connexion")}
          >
            Se connecter
          </button>
        </>
      )}
    </div>
  );
};

export default ConnexionInscription;
