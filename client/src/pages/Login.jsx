import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <div className='p-4'>
            <form onSubmit={handleSubmit}>
                <h3>Log In</h3>

                <label>Email:</label>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>Password:</label>
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button>Log In</button>
            </form>
        </div>
    )
}

export default Login