import { Link } from 'react-router-dom'
import UsersList from './UsersList'

function Admin() {
    return (
        <section>
            <h1>Admin</h1>
            <UsersList />
            <Link to='/'>Home</Link>
        </section>
    )
}

export default Admin