import React from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Client from './components/ClientC/Client'
import ViewClient from './components/ClientC/ViewClient';
import FormClient from './components/ClientC/FormClient';
import FormReceipt from './components/Facturation/FormReceipt';
import TableReceipt from './components/Facturation/TableReceipt';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Dashboard/NavBar";
import EmailEditor from './components/Email/EmailEditor';
import Calendar from './components/Calendar/Calendar';
import { SITE_URL } from './constants/constantes';
import Admin from './components/Admin/Admin';
import Accounting from './components/Accounting/Accounting';

function App() {

  return (
    <div className="App">

      <Router >
        {window.location.pathname !== "/" ? (<NavBar />) : ""}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/client" element={<Client />} />
          <Route path="/dashboard/client/view/" element={<ViewClient />} />
          <Route path="/dashboard/client/form/" element={<FormClient idDefault={0} />} />
          <Route path="/dashboard/facturation/form" element={<FormReceipt />} />
          <Route path="/dashboard/facturation" element={<TableReceipt />} />
          <Route path="/dashboard/facturation/mail" element={<EmailEditor />} />
          <Route path="/dashboard/reservation" element={<Calendar />} />

          {/* Those are private routes */}
          <Route path="/admin/" element={<Admin />} />
          <Route path="/comptabilite/" element={<Accounting />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
