import BookCardSingle from './BookCardSingle'

function BookCard({ books }) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {books.map((book) => (
            <BookCardSingle key={book._id} book={book} />
        ))}
    </div>
  )
}

export default BookCard