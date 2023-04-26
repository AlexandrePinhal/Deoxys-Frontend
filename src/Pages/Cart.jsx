import { useState, useEffect } from "react";
import "../Style/cart.css";
import { toast } from "react-toastify";

function Cart(props) {
  const [itemsSum, setItemsSum] = useState([]);
  const [itemsLeftQuantity, setItemsLeftQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [myID, setMyID] = useState("");

  useEffect(() => {
    fetch("http://176.136.89.140:5000/users/me", {
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setMyID(user.id);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch("http://176.136.89.140:5000/fournisseurs/", {
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
      },
    })
      .then((response) => response.json())
      .then((fournisseur) => {
        setFournisseurs(fournisseur);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    for (let i = 0; i < props.cart.length; i++) {
      let temp = itemsSum;
      temp[i] = props.cart[i].price;
      setItemsSum([...temp]);
      let tempQ = quantities;
      tempQ.push(1);
      setQuantities([...tempQ]);
    }
    handleTotalPrice();
    //eslint-disable-next-line
  }, [props.cart]);

  function getFournisseur(id) {
    let temp = "";
    fournisseurs.map((fournisseur) => {
      if (fournisseur.id === id) {
        temp = fournisseur.name;
      }
    });
    return temp;
  }

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

  function handleCommandFinalization() {
    let ItemsId = [];
    console.log(props.cart);
    props.cart.forEach((item, i) => ItemsId.push(item.id + ";" + quantities[i]));
    fetch("http://176.136.89.140:5000/orders", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productList: ItemsId,
        orderType: 0,
        user: myID,
        orderState: 1,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          toast.success("Added!");
        } else {
          toast.error("Error");
        }
      })
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <ul className="bouteilles-list">
      {props.isConnected === true ? (
        <>
          {props.cart.map((bouteille, index) => {
            return (
              <li key={bouteille.uuid} className="bouteille-cart">
                <p>{getFournisseur(bouteille.fournisseur)}</p>
                <p>{bouteille.name}</p>
                <p>Prix unitaire: {bouteille.price}€</p>
                <p>Quantité : </p>
                <input
                  type="number"
                  min="1"
                  value={quantities[index]}
                  onChange={(e) => {
                    handleQuantityPrice(
                      e.target.value,
                      bouteille.price,
                      bouteille.quantity,
                      index
                    );
                  }}
                ></input>
                <p>Prix : {itemsSum[index]} €</p>
                <p>
                  Quantité disponible:{" "}
                  {itemsLeftQuantity[index]
                    ? itemsLeftQuantity[index]
                    : bouteille.quantity - 1}
                </p>
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
                <button
                  onClick={() => {
                    handleCommandFinalization();
                  }}
                >
                  Finaliser Commande
                </button>
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
