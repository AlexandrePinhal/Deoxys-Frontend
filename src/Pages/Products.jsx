import React, { useState, useEffect } from "react";
import "../Style/Products.css";

const BouteillesList = (props) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterBy, setFilterBy] = useState("all");
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/families/", {
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
      },
    })
      .then((response) => response.json())
      .then((families) => {
        setFamilies(families);
      });
    fetch("http://176.136.89.140:5000/products/", {
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
      },
    })
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleAddCart(bouteille) {
    if (props.cart.includes(bouteille)) {
      return alert("Produit déjà ajouté");
    } else {
      let temp = props.cart;
      temp.push(bouteille);
      props.setCart([...temp]);
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterBy(event.target.value);
  };

  let filteredProducts = products.filter((product) => {
    if (filterBy === "all") {
      return true;
    } else {
      return product.family.toString() === filterBy;
    }
  });

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortOrder === "asc") {
    filteredProducts = filteredProducts.sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
  } else {
    filteredProducts = filteredProducts.sort((a, b) =>
      a.price > b.price ? -1 : 1
    );
  }

  return (
    <div>
      <div style={{ backgroundColor: "#eae5e1" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            backgroundColor: "#eae5e1",
            paddingTop: "20px",
          }}
        >
          <input
            className="inputProducts"
            type="text"
            placeholder="Rechercher un produit"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "50%", padding: "5px" }}
          />
        </div>
        <div
          className="ProductsFilterHolder"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <label>Trier par prix:</label>
            <select
              value={sortOrder}
              onChange={handleSort}
              style={{ marginLeft: "10px" }}
            >
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <label>Filtrer par:</label>
            <select
              value={filterBy}
              onChange={handleFilter}
              style={{ marginLeft: "10px" }}
            >
              <option value="all">Toutes les catégories</option>
              {families.map((family) => {
                return <option value={family.id}>{family.name}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="bouteilles-grid">
        {props.isConnected === true ? (
          <>
            {filteredProducts.map((bouteille) => {
              return (
                <div key={bouteille.id} className="bouteille-item">
                  {/* <img
                src={require(../Assets/Products/${bouteille.id}.png)}
                alt={${bouteille.fournisseur} ${bouteille.famille}}
                /> */}
                  <p>{bouteille.name}</p>
                  <p>{bouteille.famille}</p>
                  <p>Prix: {bouteille.price}€</p>
                  <p>Quantité disponible: {bouteille.quantity}</p>
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
    </div>
  );
};

export default BouteillesList;
