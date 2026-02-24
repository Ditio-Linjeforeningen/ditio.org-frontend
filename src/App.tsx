import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/" element={<Events />} />
        <Route path="/about" element={<div><h1>Om Ditio</h1></div>} />
      </Routes>
    </Router>
  );
}