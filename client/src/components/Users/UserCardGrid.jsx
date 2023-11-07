import UserCardSingle from './UserCardSingle'

function UserCard({ users }) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {users.map((user) => (
            <UserCardSingle key={user._id} user={user} />
        ))}
    </div>
  )
}

export default UserCard