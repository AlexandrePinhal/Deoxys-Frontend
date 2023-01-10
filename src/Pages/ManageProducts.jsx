import React from "react";

import CreateProductForm from "../Components/AddProduct.jsx";
import EditProducts from "../Components/EditProducts.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ManageProducts = (props) => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
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
