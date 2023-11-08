import { useNavigate } from 'react-router-dom'

function Unauthorized() {
    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <article className='p-4'>
            <h1 className='text-3xl my-8'>Unauthorized</h1>
            <p>You do not have permission to view the requested page.</p>
            <div>
                <button onClick={goBack}>Go Back</button>
            </div>
        </article>
    )
}

export default Unauthorized