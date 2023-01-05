import React, { useState } from "react";
import '../Style/ConnexionInscription.css'

const ConnexionInscription = (props) => {
  const [formulaireActif, setFormulaireActif] = useState("connexion");

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
            <button className="bouton" onClick={() => {props.setIsConnected(true)}}>Se connecter</button>
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
            <input type="text" placeholder="Nom" className="modern-input" />
            <input type="text" placeholder="Prénom" className="modern-input" />
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
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="modern-input"
            />
            <button className="bouton" onClick={() => {props.setIsConnected(true)}}>S'inscrire</button>
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
