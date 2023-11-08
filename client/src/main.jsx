import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SnackbarProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </SnackbarProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
