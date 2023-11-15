import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useGetBookDetailsQuery } from '../slices/booksApiSlice'
import { addToCart } from '../slices/cartSlice'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Books/Rating'


function ShowBook() {
  const { bookID } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const {
    data: book,
    isLoading,
    error
  } = useGetBookDetailsQuery(bookID)

  const addToCartHandler = () => {
    dispatch(addToCart({ ...book, qty }))
    navigate('/cart')
  }

  return (
    <Container>
      <BackButton />
      <h1 className='text-3xl my-4 text-stone-700'>Book Details</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          <Col md={3}>
            <Image src={book.coverURL} alt={book.title} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='font-bold text-2xl mb-1'>{book.title}</h2>
                <h3 className='font-semibold text-lg'>{book.author}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={book.rating} text={`${book.numReviews} Reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>
                {book.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col className='text-lg font-semibold text-right'>
                      ${book.standardPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col className='text-lg font-semibold text-right'>
                      {book.numInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {book.numInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          { [...Array(book.numInStock).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          )) }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className='text-right'>
                  <Button
                    className='bg-slate-700 hover:bg-slate-400 text-gray-50'
                    type='button'
                    disabled={book.numInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default ShowBook