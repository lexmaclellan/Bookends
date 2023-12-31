import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import axios from '../../api/axios'
import Loader from '../Loader'
import UserCardGrid from './UserCardGrid'
const USERS_URL = '/api/users'

function Users() {
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setLoading(true)
        let isMounted = true
        const controller = new AbortController()

        const getUsers = async () => {
            try {
                const res = await axios.get(USERS_URL, {
                    signal: controller.signal
                })
                isMounted && setUsers(res.data.data.usersList)
                setLoading(false)
            } catch (err) {
                isMounted && setUsers.log(err)
                setLoading(false)
                console.error(err)
                navigate('/login', { state: { from: location }, replace: true })
            }
        }

        getUsers()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Users List</h1>
                <Link to='/users/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {users?.length
                        ? (
                            <UserCardGrid users={users} />
                        ) : <p>No users to display</p>
                    }
                </>
            )}
        </>
    )
}

export default Users