import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()

    if(!user) {
        return <Navigate to="/login" />
    }

    return (
        <>
            {children}
        </>
    )
}

ProtectedRoute.propTypes = {
    children: PropTypes.any
}

export default ProtectedRoute