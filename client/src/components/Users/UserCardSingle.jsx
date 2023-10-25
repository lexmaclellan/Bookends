import { Link } from 'react-router-dom'

function UserCardSingle({ user }) {
  return (
    <div
        key={user._id}
        className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
    >
        <h4 className='my-2 text-gray-500'>{user._id}</h4>
        <div className='flex justify-start items-center gap-x-2'>
            <h2 className='my-1'>{user.name}</h2>
        </div>
        <div className='flex justify-start items-center gap-x-2'>
            <h2 className='my-1'>{user.email}</h2>
        </div>
    </div>
  )
}

export default UserCardSingle