import React from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Client from './components/ClientC/Client'
import ViewClient from './components/ClientC/ViewClient';
import FormClient from './components/ClientC/FormClient';
import FormReceipt from './components/Facturation/FormReceipt';
import NavBar from './components/Dashboard/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* {localStorage.getItem("token") ? (<NavBar />) : ""} */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/client" element={<Client />} />
          <Route path="/dashboard/client/view/" element={<ViewClient />} />
          <Route path="/dashboard/client/form/" element={<FormClient />} />
          <Route path="/dashboard/facturation/" element={<FormReceipt />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
