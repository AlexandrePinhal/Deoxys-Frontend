import React from "react";

import FournisseursList from "../Components/ProvidersList";
import AddFournisseurForm from "../Components/AddProvider";
import "../Style/Providers.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProvidersPage = (props) => {
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
          <AddFournisseurForm />
          <h1>Liste des fournisseurs</h1>
          <FournisseursList />
        </>
      ) : <p>Vous n'êtes pas connecté</p>}
    </div>
  );
};

export default ProvidersPage;
