import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function RequireAuth({ allowedRoles }) {
    const { auth } = useAuth()
    const location = useLocation()
    
    let userRoles = []
    if (auth.roles) {
        userRoles = Object.values(auth.roles)
    }
    
    return (
        userRoles.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.email
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth