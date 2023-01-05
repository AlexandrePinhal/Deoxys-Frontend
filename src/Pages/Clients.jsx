import React from "react";

import ClientsList from "../Components/ClientsList";
import AddClientForm from "../Components/AddClient";
import "../Style/Clients.css";

const ClientsPage = (props) => {
  return (
    <div>
      {props.isConnected === true ? (
        <>
          <AddClientForm />
          <h1>Liste des clients</h1>
          <ClientsList />
        </>
      ) : <p>Vous n'êtes pas connecté</p>}
    </div>
  );
};

export default ClientsPage;
