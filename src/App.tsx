import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { MachineDetails } from './pages/MachineDetails'
import { ReportingPage } from './pages/ReportingPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/machine/:machineId" element={<MachineDetails />} />
        <Route path="/report" element={<ReportingPage />} />
        <Route path="/report/:machineId" element={<ReportingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
