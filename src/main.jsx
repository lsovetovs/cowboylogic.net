import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store/store";
// import Header from "./components/Header/Header";
import App from "./App.jsx";
import './index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter>
        {/* <Header /> */}
        <App />
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);