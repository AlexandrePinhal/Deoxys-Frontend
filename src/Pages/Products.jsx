import React, {useState, useEffect} from "react";
import "../Style/Products.css";

const BouteillesList = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/products/")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleAddCart(bouteille) {
    let temp = props.cart;
    temp.push(bouteille);
    props.setCart([...temp]);
  }

  return (
    <div className="bouteilles-grid">
      {props.isConnected === true ? (
        <>
          {products.map((bouteille) => {
            return (
              <div key={bouteille.id} className="bouteille-item">
                <img
                  src={require(`../Assets/Products/${bouteille.id}.png`)}
                  alt={`${bouteille.fournisseur} ${bouteille.famille}`}
                />
                <p>{bouteille.fournisseur}</p>
                <p>{bouteille.famille}</p>
                <p>Prix: {bouteille.prix}€</p>
                <p>Quantité disponible: {bouteille.quantite}</p>
                <button
                  onClick={() => {
                    handleAddCart(bouteille);
                  }}
                >
                  Ajouter au panier
                </button>
              </div>
            );
          })}
        </>
      ) : (
        <p>Vous n'êtes pas connecté</p>
      )}
    </div>
  );
};

export default BouteillesList;
