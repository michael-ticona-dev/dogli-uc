import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>🚀 React conectado con Laravel correctamente</h1>
      <p>Si ves este mensaje, el frontend está funcionando.</p>
    </div>
  );
};

// Montar React en el div del Blade (app.blade.php)
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
