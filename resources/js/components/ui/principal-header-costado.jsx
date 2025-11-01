import React from "react";
import "../../../css/principal-header-costado.css"; 

const principal_header_costado = () => {
  return (
    <div className="principal-header-costado">
      <h2 className="header-logo">Dogli UC</h2>

      <nav className="header-nav">
        <a href="/">Inicio</a>
        <a href="/perdidos">Mascotas Perdidas</a>
        <a href="/adopcion">Adopción</a>
        <a href="/promociones">Promociones</a>
        <a href="/contacto">Contacto</a>
      </nav>

      <a href="/publicar" className="btn-publicar">
        Publicar Anuncio
      </a>
    </div>
  );
};

export default principal_header_costado;
