import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

// Custom hook to consume the UserContext
const useUserContext = () => {
    const context = useContext(UserContext);

    // If context is not found, throw an error
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }

    return context;
};

export default useUserContext;
