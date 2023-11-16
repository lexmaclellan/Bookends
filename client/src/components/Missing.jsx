import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Missing() {
  return (
    <Container className='text-stone-700'>
        <h1 className='font-semibold text-2xl mb-2'>404 Page Not Found</h1>
        <Link to='/'>Return Home</Link>
    </Container>
  )
}

export default Missing