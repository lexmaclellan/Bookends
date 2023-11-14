import { Outlet } from 'react-router-dom'
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
    </>
  )
}

export default Layout