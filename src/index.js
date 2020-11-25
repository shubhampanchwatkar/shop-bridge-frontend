import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
import configureStore from "./store/configure-store";
import theme from "./ui/theme";

const store = new configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
