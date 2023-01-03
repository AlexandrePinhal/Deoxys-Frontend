import React from "react";
import "../Style/Products.css";

const bouteillesJSON = require("../Products.json");

const BouteillesList = (props) => {

    function handleAddCart(bouteille) {
        let temp = props.cart 
        temp.push(bouteille)
        props.setCart([...temp])
    }

  return (
    <div className="bouteilles-grid">
      {bouteillesJSON.bouteilles.map((bouteille) => {
        return (
          <div key={bouteille.uuid} className="bouteille-item">
            <img src={require(`../Assets/Products/${bouteille.uuid}.png`)} alt={`${bouteille.fournisseur} ${bouteille.famille}`} />
            <p>{bouteille.fournisseur}</p>
            <p>{bouteille.famille}</p>
            <p>Prix: {bouteille.prix}€</p>
            <p>Quantité disponible: {bouteille.quantite}</p>
            <button onClick={() => {handleAddCart(bouteille)}}>Ajouter au panier</button>
          </div>
        );
      })}
    </div>
  );
};

export default BouteillesList;
