import { Row, Col } from 'react-bootstrap'
import BookCardSingle from './BookCardSingle'

function BookCard({ books }) {
  return (
    <Row>
      {books.map((book) => (
        <Col sm={12} md={6} lg={4} xl={3}>
          <BookCardSingle key={book._id} book={book} />
        </Col>
      ))}
    </Row>
  )
}

export default BookCard