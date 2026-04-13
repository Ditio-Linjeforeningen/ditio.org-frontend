import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import About from './pages/About';
import AdminEvents from './pages/AdminEvents';
import AdminEventDetail from './pages/AdminEventDetail';
import AdminEventCreate from './pages/AdminEventCreate';

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/events/new" element={<AdminEventCreate />} />
        <Route path="/admin/events/:id" element={<AdminEventDetail />} />
      </Routes>
    </Router>
  );
}
