import axios from '../api/axios'
import { useAuth } from './useAuth'
const REFRESH_URL = '/api/users/refresh'

function useRefreshToken() {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const res = await axios.get(REFRESH_URL, {
      withCredentials: true
    })
    setAuth(prev => {
      console.log(JSON.stringify(prev))
      console.log(res.data.token)
      return { ...prev, token: res.data.token }
    })
    return res.data.token
  }

  return refresh
}

export default useRefreshToken