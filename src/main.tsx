import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-tooltip/dist/react-tooltip.css";
import "reactjs-popup/dist/index.css";
import {
  initializeDefaultSettings,
  initializeDefaultTaskList,
} from "@components/Setting/utils/Settings";
import { AuthProvider } from "@utilities/AuthContext.tsx";

const SETTINGS_KEY = "appSettings";
const TASK_LIST_KEY = "taskLists";

initializeDefaultSettings(SETTINGS_KEY);
initializeDefaultTaskList(TASK_LIST_KEY);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
