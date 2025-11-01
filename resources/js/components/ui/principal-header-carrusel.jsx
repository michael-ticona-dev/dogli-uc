import { useState } from "react";
import "../../../css/principal-header-carrusel.css"; 

const datos_carrusel = [
  {
    id: 1,
    titulo: "Mascotas Perdidas",
    informacion: "Encuentra a tu mascota perdida rápidamente. Publica y revisa avisos en tu zona.",
    imagen: "https://i.pinimg.com/736x/1a/50/bb/1a50bbb261d5081bcca653b1d55f6fee.jpg",
    textoBoton: "Ver Más",
    enlaceBoton: "/mascotas-perdidas"
  },
  {
    id: 2,
    titulo: "Tienda de Mascotas",
    informacion: "Descubre productos y accesorios para tus mascotas. Calidad garantizada.",
    imagen: "https://via.placeholder.com/300x200?text=Tienda+Mascotas",
    textoBoton: "Ir a la Tienda",
    enlaceBoton: "/tienda"
  },
  {
    id: 3,
    titulo: "Adopciones",
    informacion: "Conecta con refugios y adopta a tu nuevo mejor amigo.",
    imagen: "https://via.placeholder.com/300x200?text=Adopciones",
    textoBoton: "Ver Adopciones",
    enlaceBoton: "/adopciones"
  },
];

export default function carrusel() {
  const [actual, set_actual] = useState(0);

  const anterior = () => {
    set_actual((prev) => (prev === 0 ? datos_carrusel.length - 1 : prev - 1));
  };

  const siguiente = () => {
    set_actual((prev) => (prev === datos_carrusel.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="contenedor-carrusel">
      <button className="btn-carrusel anterior" onClick={anterior}>◀</button>
      <button className="btn-carrusel siguiente" onClick={siguiente}>▶</button>

      {datos_carrusel.map((item, index) => (
        <div
          key={item.id}
          className={`slide-carrusel ${index === actual ? "activo" : ""}`}
        >
          <div className="info-carrusel">
            <h2>{item.titulo}</h2>
            <p>{item.informacion}</p>
            <a href={item.enlaceBoton} className="btn-enlace">{item.textoBoton}</a>
          </div>
          <div className="imagen-carrusel">
            <img src={item.imagen} alt={item.titulo} />
          </div>
        </div>
      ))}
    </div>
  );
}
