import React from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Client from './components/ClientC/Client'
import ViewClient from './components/ClientC/ViewClient';
import FormClient from './components/ClientC/FormClient';
import FormReceipt from './components/Facturation/FormReceipt';
import TableReceipt from './components/Facturation/TableReceipt';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Dashboard/NavBar";
import EmailEditor from './components/Email/EmailEditor';
import { SITE_URL } from './constants/constantes';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        {window.location.href !== SITE_URL ? (<NavBar />) : ""}
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/client" element={<Client />} />
          <Route path="/dashboard/client/view/" element={<ViewClient />} />
          <Route path="/dashboard/client/form/" element={<FormClient />} />
          <Route path="/dashboard/facturation/form" element={<FormReceipt />} />
          <Route path="/dashboard/facturation" element={<TableReceipt />} />
          <Route path="/dashboard/facturation/mail" element={<EmailEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
