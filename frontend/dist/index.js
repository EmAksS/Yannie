import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
var container = document.getElementById("root");
if (!container) {
    throw new Error("Root container missing");
}
var root = createRoot(container);
root.render(_jsx(StrictMode, { children: _jsx(App, {}) }));
