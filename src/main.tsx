import React from "react";
import ReactDOM from "react-dom/client";
import App from "./apps/app.tsx";
import "./sentry.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
