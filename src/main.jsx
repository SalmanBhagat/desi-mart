import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
// styles for react-tabs (Admin Dashboard active tab card styling)
import "react-tabs/style/react-tabs.css";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";

// Register PWA Service Worker
registerSW({
  onNeedRefresh() {
    console.log("New version available, refresh to update.");
  },
  onOfflineReady() {
    console.log("PWA ready to work offline.");
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
