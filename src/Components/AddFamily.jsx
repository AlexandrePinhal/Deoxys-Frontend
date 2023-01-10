import React, { useState } from "react";
import "../Style/AddWineFamily.css";
import { toast } from "react-toastify";

const AddFamilleVinForm = () => {
  const [nom, setNom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://176.136.89.140:5000/families/", {
      method: "POST",
      headers: {
        Authorization: (localStorage.getItem("token") ? `Basic ${localStorage.getItem("token")}` : undefined),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nom,
      })
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success("Added!");
      } else {
        toast.error("Error");
      }
    })
      .catch((error) => {
        console.error(error);
      });
    setNom("");
  };

  return (
    <form className="add-famille-vin-form" onSubmit={handleSubmit}>
      <h2>Ajouter une famille de vin</h2>
      <div className="form-group">
        <label htmlFor="nom">Nom de la famille</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <button>Ajouter</button>
    </form>
  );
};

export default AddFamilleVinForm;
