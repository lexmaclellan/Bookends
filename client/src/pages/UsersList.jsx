import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import axios from 'axios'
import Spinner from '../components/Spinner'
import UserCardGrid from '../components/Users/UserCardGrid'

function Users() {
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:5000/api/users')
            .then((res) => {
                console.log("Pay attention to this", res.data.data.usersList)
                setUsers(res.data.data.usersList)
                setLoading(false)
            })
            .catch((err) => {
                setUsers.log(err)
                setLoading(false)
            })
    }, [])
    return (
        <article className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Users List</h1>
                <Link to='/users/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {users?.length
                        ? (
                            <UserCardGrid users={users} />
                        ) : <p>No users to display</p>
                    }
                </>
            )}
        </article>
    )
}

export default Users