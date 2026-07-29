import React from "react";
import ReactDOM from "react-dom/client";
// drag-drop-touch: polyfill that enables HTML5 drag-and-drop on touch devices.
// Import for side-effects only (auto-registers global listeners).
import "drag-drop-touch";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
