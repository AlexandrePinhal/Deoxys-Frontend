import React from "react";

import CreateProductForm from "../Components/AddProduct.jsx";
import EditProducts from "../Components/EditProducts.jsx";

const ManageProducts = (props) => {
  return (
    <div>
      {props.isConnected === true ? (
        <>
          <CreateProductForm />
          <h1>Liste des Produits</h1>
          <EditProducts/>
        </>
      ) : (
        <p>Vous n'êtes pas connecté</p>
      )}
    </div>
  );
};

export default ManageProducts;
