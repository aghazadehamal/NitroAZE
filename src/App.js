// App.js veya ana bileşeniniz
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './CarList';
import CarDetails from './CarDetails';
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarList />} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
