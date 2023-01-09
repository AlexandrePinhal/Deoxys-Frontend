import { useState, useEffect } from "react";
import "../Style/cart.css";

function Cart(props) {
  const [itemsSum, setItemsSum] = useState([]);
  const [itemsLeftQuantity, setItemsLeftQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    for (let i = 0; i < props.cart.length; i++) {
      let temp = itemsSum;
      temp[i] = props.cart[i].prix;
      setItemsSum([...temp]);
      let tempQ = quantities;
      tempQ.push(1);
      setQuantities([...tempQ]);
    }
    handleTotalPrice();
    //eslint-disable-next-line
  }, [props.cart]);

  function handleQuantityPrice(value, price, quantity, index) {
    if (quantity - value >= 0 && value > 0) {
      let temp = itemsSum;
      temp[index] = price * value;
      setItemsSum([...temp]);
      let tempQ = itemsLeftQuantity;
      tempQ[index] = quantity - value;
      setItemsLeftQuantity([...tempQ]);
      let tempQ2 = quantities;
      tempQ2[index] = value;
      setQuantities([...tempQ2]);
      handleTotalPrice();
    } else if (quantity - value <= 0) {
      alert("Stock Insufisant");
    }
  }

  function handleTotalPrice() {
    setTotalPrice(
      itemsSum.reduce((accumulateur, valeurActuelle) => {
        return accumulateur + valeurActuelle;
      }, 0)
    );
  }

  function deleteRow(index) {
    let temp = props.cart;
    temp.splice(index, 1);
    props.setCart([...temp]);
    let temp2 = itemsSum;
    temp2.splice(index, 1);
    setItemsSum([...temp2]);
  }

  return (
    <ul className="bouteilles-list">
      {props.isConnected === true ? (
        <>
          {props.cart.map((bouteille, index) => {
            return (
              <li key={bouteille.uuid} className="bouteille-cart">
                <p>{bouteille.fournisseur}</p>
                <p>{bouteille.famille}</p>
                <p>Prix unitaire: {bouteille.prix}€</p>
                <p>Quantité : </p>
                <input
                  type="number"
                  min="1"
                  value={quantities[index]}
                  onChange={(e) => {
                    handleQuantityPrice(
                      e.target.value,
                      bouteille.prix,
                      bouteille.quantite,
                      index
                    );
                  }}
                ></input>
                <p>Prix : {itemsSum[index]} €</p>
                <p>Quantité disponible: {itemsLeftQuantity[index]}</p>
                <button
                  onClick={() => {
                    deleteRow(index);
                  }}
                ></button>
              </li>
            );
          })}

          {props.cart.length > 0 ? (
            <div
              style={{
                width: "100%",
                justifyContent: "space-around",
                display: "inline-flex",
              }}
            >
              <div>prix total : {totalPrice} €</div>
              <div>
                <button>Finaliser Commande</button>
              </div>
            </div>
          ) : (
            <p>Votre panier est vide</p>
          )}
        </>
      ) : (
        <p>Vous n'êtes pas connecté</p>
      )}
    </ul>
  );
}

export default Cart;
