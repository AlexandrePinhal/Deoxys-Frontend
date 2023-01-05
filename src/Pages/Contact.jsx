import React from "react";
import "../Style/Contact.css";

const ContactForm = (props) => {
  return (
    <form className="contact-form">
      {props.isConnected === true ? (
        <>
          <h2>Contactez-nous</h2>
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" name="nom" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="sujet">Sujet</label>
            <input type="text" id="sujet" name="sujet" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit">Envoyer</button>
        </>
      ) : (
        <p>Vous n'êtes pas connecté</p>
      )}
    </form>
  );
};

export default ContactForm;
