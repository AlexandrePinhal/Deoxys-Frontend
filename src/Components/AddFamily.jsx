import React, { useState } from "react";
import "../Style/AddWineFamily.css";

const AddFamilleVinForm = () => {
  const [nom, setNom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
