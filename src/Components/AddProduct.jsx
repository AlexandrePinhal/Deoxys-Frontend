import React, { useState, useEffect } from "react";
import "../Style/AddProducts.css";

const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [fournisseur, setFournisseur] = useState("");
  const [famille, setFamille] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fournisseurs, setFournisseurs] = useState([]);
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/fournisseurs/")
      .then((response) => response.json())
      .then((fournisseurs) => {
        setFournisseurs(fournisseurs);
        console.log(fournisseurs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/families/")
      .then((response) => response.json())
      .then((families) => {
        setFamilies(families);
        console.log(families)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://176.136.89.140:5000/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        year: parseInt(year),
        fournisseur: parseInt(fournisseur),
        family : parseInt(famille),
        price: parseInt(price),
        quantity: parseInt(quantity),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="create-product-form">
      <h2>Créer un produit</h2>
      <div className="form-group-create">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group-create">
        <label htmlFor="year">Year</label>
        <input
          type="text"
          id="year"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div className="form-group-create">
        <label htmlFor="fournisseur">Fournisseur</label>
        <select
          id="fournisseur"
          name="fournisseur"
          value={fournisseur}
          onChange={(e) => {
            setFournisseur(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value={"- - -"}></option>
          {fournisseurs.map((fournisseur) => {
            return (
              <option key={fournisseur.id} value={fournisseur.id}>
                {fournisseur.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group-create">
        <label htmlFor="family">Famille</label>
        <select
          id="family"
          name="family"
          value={famille}
          onChange={(e) => {
            setFamille(e.target.value);
          }}
        >
          <option value={"- - -"}></option>
          {families.map((famille) => {
            return (
              <option key={famille.id} value={famille.id}>
                {famille.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group-create">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group-create">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <button>Créer</button>
    </form>
  );
};

export default CreateProductForm;
