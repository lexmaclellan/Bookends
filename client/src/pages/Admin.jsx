import { Link } from 'react-router-dom'
import UsersList from './UsersList'

function Admin() {
    return (
        <article className='p-4'>
            <h1 className='text-3xl my-8'>Admin</h1>
            <UsersList />
        </article>
    )
}

export default Admin