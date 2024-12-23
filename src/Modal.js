import React, { useState, useEffect } from "react";
import "./modal.css";

export const Modal = ({ isOpen, mensaje, closeModal, confirmacion }) => {
  const [colorAlerta, setColorAlerta] = useState(false);

  useEffect(() => {
    if (confirmacion === "Incorrecto" || confirmacion === "Incorrect") {
      setColorAlerta(true);
    } else {
      setColorAlerta(false);
    }
  }, [confirmacion]);

  if (!isOpen) {
    return null;
  }

  const handleCloseModal = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  return (
    <div className="modal" onClick={handleCloseModal}>
      <div className="modal-content">
        {/* Botón de cerrar en la esquina superior derecha */}
        <button className="close-button" onClick={closeModal}>
          ×
        </button>

        <div
          className="modal-header"
          style={{ color: colorAlerta ? "red" : "#a0c33d" }}
        >
          <h3>{confirmacion}</h3>
        </div>
        <div className="modal-body">
          <p>{mensaje}</p>
        </div>
      </div>
    </div>
  );
};
