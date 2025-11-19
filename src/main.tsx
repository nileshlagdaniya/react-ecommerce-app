import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store.ts";
import { AppThemeProvider } from "./theme/index.tsx";
import { initAuthListener } from "./features/auth/authSlice.ts";
import AppRoutes from "./routes/AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";

const Loader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuthListener());
  }, []);

  return <AppRoutes />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppThemeProvider>
          <Loader />
        </AppThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
