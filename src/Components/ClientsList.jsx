import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ClientsList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://176.136.89.140:5000/users/", {
      headers: { Authorization: localStorage.getItem("token")
      ? `Basic ${localStorage.getItem("token")}`
      : undefined,}
    })
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleUserDeletion(e, i, index) {
    e.preventDefault(e);
    let temp = users;
    temp.splice(index, 1);
    setUsers([...temp]);
    fetch(`http://176.136.89.140:5000/users/${i}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
        ? `Basic ${localStorage.getItem("token")}`
        : undefined,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        toast.success("Deleted!");
      } else {
        toast.error("Error");
      }
    });
  }

  return (
    <div>
      {users.map((client, index) => {
        return (
          <div key={client.email} className="client-info">
            <h3>{client.name}</h3>
            {/* <p>Téléphone: {client.telephone}</p> */}
            <p>Email: {client.email}</p>
            <p>Id: {client.id}</p>
            <p>Role: {client.role}</p>
            {/* <h4>Historique de commandes</h4>
            {client.historique_commandes.map((commande) => {
              return (
                <div key={commande.numero_commande} className="order">
                  <p>Date: {commande.date}</p>
                  <p>Numéro de commande: {commande.numero_commande}</p>
                  <p>Nombre de produits: {commande.nombre_produits}</p>
                </div>
              );
            })} */}
            <button
              className="buttonDeletion"
              onClick={(e) => {
                handleUserDeletion(e, client.id, index);
              }}
            ></button>
          </div>
        );
      })}
    </div>
  );
};

export default ClientsList;
