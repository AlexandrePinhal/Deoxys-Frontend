import React from "react";

import FamillesList from "../Components/FamilyList";
import AddFamillesForm from "../Components/AddFamily";
import "../Style/Families.css";

const FamiliesPage = (props) => {
  return (
    <div>
      {props.isConnected === true ? (
        <>
          <AddFamillesForm />
          <h1>Liste des familles</h1>
          <FamillesList />
        </>
      ) : <p>Vous n'êtes pas connecté</p>}
    </div>
  );
};

export default FamiliesPage;
