import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { IoLibrary } from 'react-icons/io5'
import { FaBars, FaCartShopping, FaUser } from 'react-icons/fa6'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'

function Header() {
    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let location = useLocation()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap
            dispatch(logout())
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <header>
            <Navbar className='bg-stone-600' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='flex'>
                            <span className='flex-col text-3xl mr-2 text-stone-200'><IoLibrary /></span>
                            <span className='flex-col text-2xl text-stone-200'>Bookends</span>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link className='flex'>
                                    <span className='flex-col text-xl mr-2 text-stone-200'><FaCartShopping /></span>
                                    <span className='flex-col text-lg text-stone-200'>Cart
                                        {
                                            cartItems.length > 0 && (
                                                <> (
                                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                                    ) </>
                                            )
                                        }
                                    </span>
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown className='text-lg profile' title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link className='flex'>
                                        <span className='flex-col text-xl mr-2 text-stone-200'><FaUser /></span>
                                        <span className='flex-col text-lg text-stone-200'>Sign In</span>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header