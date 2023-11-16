import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <Header />
      <main className='App py-3'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default Layout