import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminEvents from './pages/AdminEvents';
import AdminEventDetail from './pages/AdminEventDetail';

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/om-oss" element={<About />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/events/:id" element={<AdminEventDetail />} />
      </Routes>
    </Router>
  );
}