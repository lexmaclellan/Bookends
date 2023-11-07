import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BooksList from './pages/BooksList'
import CreateBook from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import Login from './pages/Login'
import ShowBook from './pages/ShowBook'
import Signup from './pages/Signup'
import Users from './pages/UsersList'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<BooksList />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/account-recovery' element={<></>} />
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