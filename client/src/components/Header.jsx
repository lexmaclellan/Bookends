import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoLibrary } from 'react-icons/io5'
import { FaBars } from 'react-icons/fa6'
import { useAuth } from '../hooks/useAuth'
import useLogout from '../hooks/useLogout'

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { auth } = useAuth()
    const navigate = useNavigate()
    let location = useLocation()
    const logout = useLogout()

    const signOut = async () => {
        await logout()
        navigate('/login')
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    /* check for user authentication on route change */
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
            <div className='flex bg-slate-900 items-center justify-between py-4 px-10'>
                <div className='font-bold text-2xl flex items-center text-gray-50 '>
                    <Link className='hover:underline hover:text-sky-200 flex' to='/'>
                        <span className='text-3xl text-gray-50 mr-1 flex-col'>
                            <IoLibrary />
                        </span>
                        <h1 className='flex-col'>Bookends</h1>
                    </Link>
                </div>
                <ul className='md:flex md:items-center py-2'>
                    <li className='md:flex hidden'>
                        <Link className='px-5 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/admin'>Admin</Link>
                    </li>
                    {!isAuthenticated
                        ? <>
                            {/* Display login and signup links if user is not logged in */}
                            <li className='md:flex hidden'>
                                <Link className='px-5 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/login'>Login</Link>
                            </li>
                            <li className='md:flex hidden'>
                                <Link className='px-5 text-gray-50 font-semibold hover:underline hover:text-sky-200' to='/signup'>Signup</Link>
                            </li>
                        </>
                        : <>
                            {/* Display logout button if user is logged in */}
                            <li className='md:flex hidden'>
                                <button
                                    className='px-5 bg-transparent text-gray-50 font-semibold hover:underline hover:text-sky-200'
                                    onClick={signOut}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    }
                    <li className='md:hidden'>
                        <FaBars className='text-2xl' />
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header