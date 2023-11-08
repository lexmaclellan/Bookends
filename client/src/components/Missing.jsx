import { Link } from 'react-router-dom'

function Missing() {
  return (
    <article className='p-12'>
        <h1>404 Page Not Found</h1>
        <Link to='/'>Return Home</Link>
    </article>
  )
}

export default Missing