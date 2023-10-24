import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className='bg-gray-800'>
        <div className='container flex w-full'>
            <div className='flex flex-col'>
                <Link className='px-5 py-2 text-gray-50' to='/'>
                    <h1>Bookends</h1>
                </Link>
            </div>
            <nav className='flex items-center'>
                <div>
                    <Link className='px-5 py-2 text-gray-50' to='/login'>Login</Link>
                    <Link className='px-5 py-2 text-gray-50' to='/signup'>Signup</Link>
                </div>
            </nav>
        </div>
    </header>
  )
}

export default Navbar