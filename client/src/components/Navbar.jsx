import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { auth } = useAuth()
    let location = useLocation()

    useEffect(() => {
        if (auth.accessToken) {
            setIsAuthenticated(true)
        }
        else {
            setIsAuthenticated(false)
        }
    }, [location])
    
    return (
        <header className='shadow-md w-full'>
            <div className='md:flex bg-slate-900 items-center justify-between py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl flex items-center text-gray-50 '>
                    <Link className='hover:underline hover:text-sky-200 flex' to='/'>
                        <span className='text-3xl text-gray-50 mr-1 flex-col'>
                            <ion-icon name="library"></ion-icon>
                        </span>
                        <h1 className='flex-col'>Bookends</h1>
                    </Link>
                </div>
                <ul className='md:flex md:items-center'>
                    <li>
                        <Link className='px-5 py-2 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/admin'>Admin</Link>
                    </li>
                    {!isAuthenticated
                        ? <>
                            <li>
                                <Link className='px-5 py-2 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link className='px-5 py-2 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/signup'>Signup</Link>
                            </li>
                        </>
                        : <>
                            <li>
                                <Link className='px-5 py-2 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/logout'>Logout</Link>
                            </li>
                        </>
                    }
                    
                </ul>
            </div>
        </header>
    )
}

export default Navbar