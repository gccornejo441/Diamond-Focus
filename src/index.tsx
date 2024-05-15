import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-tooltip/dist/react-tooltip.css'
import 'reactjs-popup/dist/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeDefaultSettings, initializeDefaultTaskList } from './components/Setting/utils/Settings';

const SETTINGS_KEY = 'appSettings';
const TASK_LIST_KEY = 'taskList';

initializeDefaultSettings(SETTINGS_KEY);
initializeDefaultTaskList(TASK_LIST_KEY);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
