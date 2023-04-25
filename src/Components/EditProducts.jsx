import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "../Style/EditProducts.css";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/fournisseurs/", {
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
      },
    })
      .then((response) => response.json())
      .then((fournisseurs) => {
        setFournisseurs(fournisseurs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://176.136.89.140:5000/products/", {
        headers: {
          Authorization: localStorage.getItem("token")
            ? `Basic ${localStorage.getItem("token")}`
            : undefined,
        },
      });
      const data = await result.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  const handleUpdate = (product) => {
    setUpdateProduct(product);
    setIsUpdating(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateProductDTO = {
      Id: updateProduct.id,
      Name: updateProduct.name,
      Year: updateProduct.year,
      Fournisseur: updateProduct.fournisseur,
      Family: updateProduct.family,
      Price: updateProduct.price,
      Quantity: updateProduct.quantity,
    };
    fetch("http://176.136.89.140:5000/products/", {
      method: "PUT",
      body: JSON.stringify(updateProductDTO),
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Updated!");
        } else {
          toast.error("Error");
        }
      })
      .catch((error) => console.error(error));
    setIsUpdating(false);
    setUpdateProduct({});
  };

  function handleProductDeletion(e, i, index) {
    e.preventDefault(e);
    let temp = products;
    temp.splice(index, 1);
    setProducts([...temp]);
    fetch(`http://176.136.89.140:5000/Products/${i}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Basic ${localStorage.getItem("token")}`
          : undefined,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        toast.success("Deleted!");
      } else {
        toast.error("Error");
      }
    });
  }

  return (
    <div>
      {products.map((product, index) => {
        return (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>Année: {product.year}</p>
            <p>Fournisseur: {product.fournisseur}</p>
            <p>Famille: {product.family}</p>
            <p>Prix: {product.price}</p>
            <p>Quantité: {product.quantity}</p>
            <button onClick={() => handleUpdate(product)}>Modifier</button>
            <button
              onClick={(e) => handleProductDeletion(e, product.id, index)}
            >
              Supprimer
            </button>
          </div>
        );
      })}
      {isUpdating && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updateProduct.name}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Année</label>
            <input
              type="text"
              id="year"
              name="year"
              value={updateProduct.year}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, year: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="fournisseur">Fournisseur</label>
            <select
              id="fournisseur"
              name="fournisseur"
              value={updateProduct.fournisseur}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  fournisseur: e.target.value,
                })
              }
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
          <div className="form-group">
            <label htmlFor="family">Famille</label>
            <select
              id="family"
              name="family"
              value={updateProduct.family}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, family: e.target.value })
              }
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
          <div className="form-group">
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              id="price"
              name="price"
              value={updateProduct.price}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, price: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantité</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={updateProduct.quantity}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, quantity: e.target.value })
              }
            />
          </div>
          <button type="submit">Enregistrer</button>
        </form>
      )}
    </div>
  );
};

export default EditProducts;
