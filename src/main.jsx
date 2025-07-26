console.log("🔥 main.jsx top");
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
console.log("📦 Imports done");

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  console.log("🚀 React mounted");
} catch (e) {
  console.error("❌ Error mounting app:", e);
}