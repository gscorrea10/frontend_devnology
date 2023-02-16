import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/global.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Dashboard articles={[]} selectedArticle={null} />
    </Router>
  );
}

export default App;
