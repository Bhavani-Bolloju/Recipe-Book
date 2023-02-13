import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import { BrowserRouter } from "react-router-dom";
import { ProviderAuthContext } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProviderAuthContext>
        <App />
      </ProviderAuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
