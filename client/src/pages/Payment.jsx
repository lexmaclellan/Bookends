import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { savePaymentMethod } from '../slices/cartSlice'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('Stripe')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/place-order')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h2 className='text-2xl block text-center font-semibold'>Payment Method</h2>

            <Form onSubmit={ submitHandler }>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='Stripe or Credit Card'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Button
                    type='submit'
                    className='mt-2 w-full bg-stone-800 text-stone-100 font-semibold rounded-md'
                >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Payment