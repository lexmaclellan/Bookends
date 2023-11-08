import { Routes, Route } from 'react-router-dom'
import BooksList from './pages/BooksList'
import CreateBook from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import Login from './pages/Login'
import ShowBook from './pages/ShowBook'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import Unauthorized from './pages/Unauthorized'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'

const ROLES = {
  'Admin': 6401,
  'Editor': 8170,
  'User': 3509,
  'Banned': 4444
}

function App() {
  return (
    <main className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/' element={<BooksList />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users/account-recovery' element={<></>} />

          {/* public routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} /> }>
            <Route path='/books/details/:bookID' element={<ShowBook />} />
          </Route>
          
          {/* protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path='/admin' element={<Admin />} />
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