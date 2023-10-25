import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BooksList from './pages/BooksList'
import CreateBook from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Users from './pages/UsersList'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<BooksList />} />
        <Route path='/users' element={<Users />} />
        <Route path='/books/create' element={<CreateBook />} />
        <Route path='/books/details/:bookID' element={<ShowBook />} />
        <Route path='/books/edit/:bookID' element={<EditBook />} />
        <Route path='/books/delete/:bookID' element={<DeleteBook />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App