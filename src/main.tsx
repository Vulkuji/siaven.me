import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { langFromPath } from "./i18n";
import "@fontsource-variable/urbanist";
import "@fontsource-variable/noto-sans-sc";
import "@fontsource-variable/noto-serif-sc";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./index.css";

const root = document.getElementById("root")!;
const page = root.dataset.page === "not-found" ? "not-found" : "home";
const application = (
  <StrictMode>
    <App page={page} lang={langFromPath(window.location.pathname)} />
  </StrictMode>
);

if (import.meta.env.PROD) {
  hydrateRoot(root, application);
} else {
  createRoot(root).render(application);
}
