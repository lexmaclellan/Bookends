import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { MdOutlineAddBox } from 'react-icons/md'
import { useGetBooksQuery } from '../slices/booksApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import BookCardGrid from '../components/Books/BookCardGrid'
const LOGIN_URL = '/api/books'

function Home() {
    const { data: books, isLoading, error } = useGetBooksQuery()
    
    return (
        <Container>
            <Row>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-3 text-stone-700'>Welcome to Bookends</h1>
                </div>
            </Row>
            <Row>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>
                        { error?.data?.message || error.error }
                    </Message>
                ) : (
                    <>
                        {books?.data?.length
                            ? (
                                <BookCardGrid books={books.data} />
                            ) : <p>No books to display</p>
                        }
                    </>
                )}
            </Row>
        </Container>
    )
}

export default Home