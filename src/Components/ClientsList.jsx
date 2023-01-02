import React from "react";

const clientsJSON = require("../Clients.json");

const ClientsList = () => {
  return (
    <div>
      {clientsJSON.clients.map((client) => {
        return (
          <div key={client.email} className='client-info'>
            <h3>
              {client.prenom} {client.nom}
            </h3>
            <p>Téléphone: {client.telephone}</p>
            <p>Email: {client.email}</p>
            <h4>Historique de commandes</h4>
            {client.historique_commandes.map((commande) => {
              return (
                <div key={commande.numero_commande} className="order">
                  <p>Date: {commande.date}</p>
                  <p>Numéro de commande: {commande.numero_commande}</p>
                  <p>Nombre de produits: {commande.nombre_produits}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ClientsList;
