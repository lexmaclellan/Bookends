import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function ShowBook() {
  const [book, setBook] = useState([])
  const [loading, setLoading] = useState(false)
  const { bookID } = useParams()
  
  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/api/books/${bookID}`)
      .then((res) => {
        console.log(`Book ID: ${bookID}`)
        setBook(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  )
}

export default ShowBook