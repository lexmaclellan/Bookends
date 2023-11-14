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

    const oldCode = () => {
        
        <div
            key={book._id}
            className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
        >
            <h2 className='absolute top-1 right-2 px-4 bg-gray-600 rounded-lg'>
                {book.publishedYear}
            </h2>
            <h4 className='my-2 text-gray-500'>{book._id}</h4>
            <div className='flex justify-start items-center gap-x-2'>
                <PiBookOpenTextLight className='text-gray-300 text-2xl' />
                <h2 className='my-1'>{book.title}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <BiUserCircle className='text-gray-300 text-2xl' />
                <h2 className='my-1'>{book.author}</h2>
            </div>
            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                <BiShow
                    className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                    onClick={() => setShowModal(true)}
                />
                <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-black' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className='text-2xl text-red-600 hover:text-black' />
                </Link>
            </div>
            {showModal && (
                <BookModal book={book} onClose={() => setShowModal(false)} />
            )}
        </div>
    }

    return (
        <Card className='my-3 p-3 rounded text-gray-900'>
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
                    <Rating value={book.rating} text={book.numReviews} />
                </Card.Text>

                <Card.Text as='h3'>
                    ${book.standardPrice}
                </Card.Text>
            </div>
        </Card>
    )
}

export default BookCardSingle