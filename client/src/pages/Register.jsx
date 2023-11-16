import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
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

        if (password !== confirmPwd) {
            toast.error('Passwords do not match')
            return
        }
        else {
            try {
                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return (
        <FormContainer>
            <h3 className='text-2xl block text-center font-semibold'>Register</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Your Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </Form.Group>

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

                <Form.Group controlId='confirmPwd' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='********'
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        value={confirmPwd}
                        required
                    />
                </Form.Group>

                <Button
                    type='submit'
                    className='mt-2 w-full bg-stone-800 text-stone-100 font-semibold rounded-md'
                    disabled={isLoading}
                >
                    Register
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Register