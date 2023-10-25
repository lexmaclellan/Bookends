import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className='bg-slate-900 border-b-'>
        <div className='container flex w-full'>
            <div className='flex flex-col'>
                <Link className='px-5 py-2 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/'>
                    <h1>Bookends</h1>
                </Link>
            </div>
            <nav className='flex items-center'>
                <div>
                    <Link className='px-5 py-2 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/users'>Users</Link>
                    <Link className='px-5 py-2 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/login'>Login</Link>
                    <Link className='px-5 py-2 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/signup'>Signup</Link>
                </div>
            </nav>
        </div>
    </header>
  )
}

export default Navbar