import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import axios from 'axios'
import Spinner from '../components/Spinner'

function Home() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:5000/api/books')
            .then((res) => {
                console.log(res)
                setBooks(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {books.map((book, index) => (
                        <div className='w-full border-separate border-spacing-2'>
                            <div className='container inline-block'>
                                <div key={book._id} className='row h-8'>
                                    <div className='col border border-slate-700 rounded-md text-center'>
                                        {index + 1}
                                    </div>
                                    <div className='col border border-slate-700 rounded-md text-center'>
                                        {book.title}
                                    </div>
                                    <div className='col border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {book.author}
                                    </div>
                                    <div className='col border border-slate-700 rounded-md text-center max-md:hidden'>
                                        {book.publishedYear}
                                    </div>
                                    <div className='col border border-slate-700 rounded-md text-center'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/books/details/${book._id}`}>
                                                <BsInfoCircle className='text-2xl text-green-800' />
                                            </Link>
                                            <Link to={`/books/edit/${book._id}`}>
                                                <AiOutlineEdit className='text-2xl text-yellow-600' />
                                            </Link>
                                            <Link to={`/books/delete/${book._id}`}>
                                                <MdOutlineDelete className='text-2xl text-red-600' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Home