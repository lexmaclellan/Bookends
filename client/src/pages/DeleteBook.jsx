import { useState } from 'react'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

function DeleteBook() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { bookID } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  function handleDeleteBook() {
    setLoading(true)
    axios
      .delete(`http://localhost:5000/api/books/${bookID}`)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Book deleted successfully.', { variant: 'success' })
        navigate('/')
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar('Unable to delete book.', { variant: 'error' })
        console.log(err)
      })
  }
  return (
    <article className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Loader /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book? This action cannot be undone.</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default DeleteBook