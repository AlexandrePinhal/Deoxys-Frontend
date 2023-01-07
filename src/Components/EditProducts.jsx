import React, { useState, useEffect } from "react";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://176.136.89.140:5000/products/");
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
    setIsUpdating(false);
    setUpdateProduct({});
  };

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>Année: {product.year}</p>
            <p>Fournisseur: {product.fournisseur}</p>
            <p>Famille: {product.family}</p>
            <p>Prix: {product.price}</p>
            <p>Quantité: {product.quantity}</p>
            <button onClick={() => handleUpdate(product)}>Modifier</button>
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
            <input
              type="text"
              id="fournisseur"
              name="fournisseur"
              value={updateProduct.fournisseur}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  fournisseur: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="family">Famille</label>
            <input
              type="text"
              id="family"
              name="family"
              value={updateProduct.family}
              onChange={(e) =>
                setUpdateProduct({ ...updateProduct, family: e.target.value })
              }
            />
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
