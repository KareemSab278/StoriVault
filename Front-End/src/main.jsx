import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./store/store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <HashRouter>
        <Provider store={store}>
          {/* redux provider to make the store (idk why it is called store...) available to the app */}
          <App />
        </Provider>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>
);
