import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import axios from '../api/axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import Rating from '../components/Books/Rating'

function ShowBook() {
  const [book, setBook] = useState([])
  const [loading, setLoading] = useState(false)
  const { bookID } = useParams()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/api/books/${bookID}`)
      .then((res) => {
        setBook(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const oldCode = () => {
    <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>ID</span>
        <span>{book._id}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Title</span>
        <span>{book.title}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Author</span>
        <span>{book.author}</span>
      </div>
      <div className='my-4'>
        <span className='text-xl mr-4 text-gray-500'>Year Published</span>
        <span>{book.publishedYear}</span>
      </div>
    </div>
  }

  return (
    <article className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Book Details</h1>
      {loading ? (
        <Spinner />
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
                      {book.numInStock > 0 ? 'In Stock' : 'Out of Stock' }
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