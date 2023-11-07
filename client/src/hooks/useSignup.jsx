import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const signup = async (email, password) => {
        setLoading(true)
        setError(null)
        
        const res = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await res.json()

        if (!res.ok) {
            setLoading(false)
            setError(json.error)
        }
    }
}