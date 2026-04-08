import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import About from "./pages/About";
import AdminEvents from "./pages/AdminEvents";
import AdminEventDetail from "./pages/AdminEventDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute adminOnly>
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events/:id"
            element={
              <ProtectedRoute adminOnly>
                <AdminEventDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
