import React from "react";

import FournisseursList from "../Components/ProvidersList";
import AddFournisseurForm from "../Components/AddProvider";
import "../Style/Providers.css";

const ProvidersPage = (props) => {
  return (
    <div>
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
