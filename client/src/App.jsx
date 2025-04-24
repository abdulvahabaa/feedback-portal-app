import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound  from "./pages/common/NotFound";
import './css/style.css'
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
const App = () => {
  return (
<Router>
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      
      <Route path="/admin/*" element={<AdminRoutes />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
</Router>
  )
}

export default App