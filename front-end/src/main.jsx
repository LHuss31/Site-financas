import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Conta from './pages/conta.jsx'
import Welcome from './pages/welcome.jsx'
import Homepage from './pages/homepage.jsx'
import Perfil from './pages/perfil.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        
      <Route path="/" element={<Conta />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  </StrictMode>
);
