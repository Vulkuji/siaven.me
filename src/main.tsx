import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;
const page = root.dataset.page === "not-found" ? "not-found" : "home";
const application = (
  <StrictMode>
    <App page={page} />
  </StrictMode>
);

if (import.meta.env.PROD) {
  hydrateRoot(root, application);
} else {
  createRoot(root).render(application);
}
