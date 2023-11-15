import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { MdOutlineAddBox } from 'react-icons/md'
import axios from '../api/axios'
import Spinner from '../components/Spinner'
import BookCardGrid from '../components/Books/BookCardGrid'
const LOGIN_URL = '/api/books'

function Home() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get(LOGIN_URL)
            .then((res) => {
                setBooks(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                setBooks.log(err)
                setLoading(false)
            })
    }, [])
    return (
        <Container>
            <Row>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-3 text-stone-700'>Welcome to Bookends</h1>
                </div>
            </Row>
            <Row>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        {books?.length
                            ? (
                                <BookCardGrid books={books} />
                            ) : <p>No books to display</p>
                        }
                    </>
                )}
            </Row>
        </Container>
    )
}

export default Home