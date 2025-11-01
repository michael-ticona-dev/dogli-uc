import React from "react";
import "../../../css/principal-header-superior.css";

const principal_header_superior = () => {
  return (
    <div className="principal-header-superior">
      <a href="/carrito">🛒</a>
      <a href="/login">Iniciar sesión</a>
      <a href="/register">Registrarse</a>
    </div>
  );
};

export default principal_header_superior;
