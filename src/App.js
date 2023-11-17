import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CarList from './CarList';
import CarDetails from './CarDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
      <NavLink to="/" className="active-link">NitroAZE</NavLink>

        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
