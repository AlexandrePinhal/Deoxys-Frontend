import React from "react";

import ClientsList from "../Components/ClientsList";
import AddClientForm from "../Components/AddClient";
import "../Style/Clients.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ClientsPage = (props) => {

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
          <AddClientForm />
          <h1>Liste des clients</h1>
          <ClientsList/>
        </>
      ) : (
        <p>Vous n'êtes pas connecté</p>
      )}
    </div>
  );
};

export default ClientsPage;
