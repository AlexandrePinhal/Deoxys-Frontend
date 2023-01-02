import React from "react";

import ClientsList from "../Components/ClientsList";
import AddClientForm from "../Components/AddClient";
import "../Style/Clients.css";

const ClientsPage = () => {
  return (
    <div>
      <AddClientForm />
      <h1>Liste des clients</h1>
      <ClientsList />
    </div>
  );
};

export default ClientsPage;
