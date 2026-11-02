import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// This is the starting point of the whole app.
// It just tells React: "render the <App /> component inside
// the <div id='root'></div> element in index.html".
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
