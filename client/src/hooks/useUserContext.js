import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

// Custom hook to consume the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);

    // If context is not found, throw an error
    if (!context) {
        throw Error('useUserContext must be used within a UserProvider')
    }

    return context;
}

export default useUserContext;