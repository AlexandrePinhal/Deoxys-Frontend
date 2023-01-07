import React, {useState, useEffect} from "react";

const FournisseursList = () => {
  const [fournisseurs, setFournisseurs] = useState([]);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/fournisseurs/")
      .then((response) => response.json())
      .then((fournisseurs) => {
        setFournisseurs(fournisseurs);
        console.log(fournisseurs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleProviderDeletion(e, i) {
    e.preventDefault(e);
    let temp = fournisseurs
    temp.splice(i, 1);
    setFournisseurs([...temp]);
    fetch(`http://176.136.89.140:5000/fournisseurs/${i}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
  }

  return (
    <div>
      {fournisseurs.map((fournisseur) => {
        return (
          <div key={fournisseur.id} className="fournisseur-info">
            <h3>{fournisseur.name}</h3>
            <p>Adresse: {fournisseur.address}</p>
            <p>Téléphone: {fournisseur.phone}</p>
            <p>Email: {fournisseur.email}</p>
            <button
              className="buttonDeletion"
              onClick={(e) => {
                handleProviderDeletion(e, fournisseur.id);
              }}
            ></button>
          </div>
        );
      })}
    </div>
  );
};

export default FournisseursList;
