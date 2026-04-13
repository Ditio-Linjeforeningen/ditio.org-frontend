import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminEventList from './pages/admin/AdminEventList'
import AdminEventForm from './pages/admin/AdminEventForm'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Ditio</h1>} />
        <Route path="/admin/events" element={<AdminEventList />} />
        <Route path="/admin/events/new" element={<AdminEventForm />} />
        <Route path="/admin/events/:id/edit" element={<AdminEventForm />} />
        <Route path="/admin" element={<Navigate to="/admin/events" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
