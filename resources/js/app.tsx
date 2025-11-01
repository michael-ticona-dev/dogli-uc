import React from "react";
import { createRoot } from "react-dom/client";
import Principal_Header_Superior from "./components/ui/principal-header-superior"; 
import Principal_Header_Costado from "./components/ui/principal-header-costado";
import Principal_Header_Carrusel from "./components/ui/principal-header-carrusel";


const App = () => {
  return (
    <>
      <Principal_Header_Superior /> 
      <Principal_Header_Costado />
      <Principal_Header_Carrusel />
    </>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
