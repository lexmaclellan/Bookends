import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { useLoginMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo)
            navigate(redirect)
    }, [userInfo, redirect, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate(redirect)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <FormContainer>
            <h3 className='text-2xl block text-center font-semibold'>Login</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='your.name@example.com'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='********'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </Form.Group>

                <Button
                    type='submit'
                    className='mt-2 w-full bg-stone-800 text-stone-100 font-semibold rounded-md'
                    disabled={isLoading}
                >
                    Log In
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row className='py-3'>
                <Col>
                    New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Sign Up</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login