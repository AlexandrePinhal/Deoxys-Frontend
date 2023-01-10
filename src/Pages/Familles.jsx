import React from "react";

import FamillesList from "../Components/FamilyList";
import AddFamillesForm from "../Components/AddFamily";
import "../Style/Families.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FamiliesPage = (props) => {
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
          <AddFamillesForm />
          <h1>Liste des familles</h1>
          <FamillesList />
        </>
      ) : <p>Vous n'êtes pas connecté</p>}
    </div>
  );
};

export default FamiliesPage;
