import { Link } from 'react-router-dom'

function Missing() {
  return (
    <article className='p-12 text-stone-700'>
        <h1 className='font-semibold text-2xl mb-2'>404 Page Not Found</h1>
        <Link to='/' className='font-semibold underline hover:no-underline'>Return Home</Link>
    </article>
  )
}

export default Missing