import { useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import Rating from '../components/Books/Rating'
import { useGetBookDetailsQuery } from '../slices/booksApiSlice'

function ShowBook() {
  const { bookID } = useParams()

  const { data: book, isLoading, error } = useGetBookDetailsQuery(bookID)

  return (
    <article className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-stone-700'>Book Details</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className='text-stone-700'>
          {error?.data?.message || error.error}
        </div>
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
                    <Col className='text-lg font-semibold'>
                      ${book.standardPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col className='text-lg font-semibold'>
                      {book.numInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className='bg-slate-700 hover:bg-slate-400 text-gray-50'
                    type='button'
                    disabled={book.numInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </article>
  )
}

export default ShowBook