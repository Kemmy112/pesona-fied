import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/global.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/auth/login';
import 'boxicons/css/boxicons.min.css'; 


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App/>
        <Login/>
    </React.StrictMode>
)