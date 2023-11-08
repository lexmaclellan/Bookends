import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/Spinner'

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading(false)
    }, [])

    useEffect(() => {
        console.log(auth)
        console.log(`isLoading: ${isLoading}`)
        console.log(`accessToken: ${JSON.stringify(auth?.token)}`)
    }, [isLoading])

  return (
    <>
        {isLoading
            ? <Spinner />
            : <Outlet />
        }
    </>
  )
}

export default PersistLogin