import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle, BiShow } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import BookModal from './BookModal'
import Rating from './Rating'

function BookCardSingle({ book }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <Card className='my-3 p-3 rounded text-gray-900 card'>
            <Link to={`/books/details/${book._id}`}>
                <Card.Img src={book.coverURL} variant='top' />
            </Link>
            
            <div className='pt-1'>
                <Link to={`/books/details/${book._id}`}>
                    <Card.Title as='div'>
                        <h2 className='font-semibold text-lg'>{book.title}</h2>
                        <h3>{book.author}</h3>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating value={book.rating} text={`${book.numReviews} Reviews`} className='mb-2' />
                </Card.Text>

                <Card.Text as='h3'>
                    ${book.standardPrice}
                </Card.Text>
            </div>
        </Card>
    )
}

export default BookCardSingle