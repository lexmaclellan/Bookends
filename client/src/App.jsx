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
import Layout from './components/Layout'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <main className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path='/' element={<BooksList />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users/account-recovery' element={<></>} />
          <Route path='/books/details/:bookID' element={<ShowBook />} />
          
          {/* protect these routes */}
          <Route element={<RequireAuth />}>
            <Route path='/users' element={<Users />} />
            <Route path='/books/create' element={<CreateBook />} />
            <Route path='/books/edit/:bookID' element={<EditBook />} />
            <Route path='/books/delete/:bookID' element={<DeleteBook />} />
          </Route>

          {/* catch all */}
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App