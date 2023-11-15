import { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

function EditBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { bookID } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/api/books/${bookID}`)
      .then((res) => {
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublishedYear(res.data.publishedYear)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log('Unable to edit book: ', err)
      })
  }, [])
  
  function handleEditBook() {
    const data = {
      title,
      author,
      publishedYear
    }
    setLoading(true)
    axios
      .put(`http://localhost:5000/api/books/${bookID}`, data)
      .then (() => {
        setLoading(false)
        enqueueSnackbar('Book edited successfully.', { variant: 'success' })
        navigate('/')
      })
      .catch ((err) => {
        setLoading(false)
        enqueueSnackbar('Unable to create book.', { variant: 'error' })
        console.log(err)
      })
  }

  return (
    <article className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Loader /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=' border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className=' border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Year Published</label>
          <input
            type='text'
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className=' border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </article>
  )
}

export default EditBook