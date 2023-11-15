import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { FaTrashCan } from 'react-icons/fa6'
import { addToCart, removeFromCart } from '../slices/cartSlice'
import Message from '../components/Message'

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const addToCartHandler = async (item, qty) => {
        dispatch(addToCart({...item, qty}))
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        console.log('hello')
    }

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <h1 className='text-2xl mb-4'>Shopping Cart</h1>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty. <Link to='/'>Return Home</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.coverURL} alt={item.title} fluid />
                                        </Col>
                                        <Col md={3}>
                                            <p><Link to={`/books/details/${item._id}`}>{item.title}</Link></p>
                                            <p>{item.author}</p>
                                        </Col>
                                        <Col md={2}>
                                            ${item.standardPrice}
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                            >
                                                {[...Array(item.numInStock).keys()].map((i) => (
                                                    <option key={i + 1} value={i + 1}>
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item._id)}
                                            >
                                                <FaTrashCan />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>
                                    Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                                </h2>
                                ${cartItems
                                    .reduce((acc, item) => acc + item.qty * item.standardPrice, 0)
                                    .toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block bg-stone-700 text-stone-100 font-semibold rounded-md'
                                    disabled={ cartItems.length === 0 }
                                    onClick={ checkoutHandler }
                                >
                                    Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart