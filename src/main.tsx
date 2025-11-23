import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { RoleProvider } from "./components/theme/RoleProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <RoleProvider>
            <App />
          </RoleProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
