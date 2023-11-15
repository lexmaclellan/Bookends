import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.jsx'
import { SnackbarProvider } from 'notistack'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <Provider store={store}>
        <SnackbarProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </SnackbarProvider>
      </Provider>
    </AuthContextProvider>
  </BrowserRouter>
)
