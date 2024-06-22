import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userExpiry = localStorage.getItem('userExpiry');

        if (storedUser && userExpiry && new Date().getTime() < userExpiry) {
            setUser(storedUser);
            setIsLoading(false);
        } else {
            axios.get('http://localhost:5000/user/getuser')
                .then(({ data }) => {
                    if (data.newuser && data.newuser.isActive === true) {
                        setUser(data.newuser);
                        const expiryTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutes
                        localStorage.setItem('user', JSON.stringify(data.newuser));
                        localStorage.setItem('userExpiry', expiryTime);
                    } else {
                        setError('User not found');
                        setUser(null);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setError('Error fetching user data');
                    setUser(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, []);

    useEffect(() => {
        if (user) {
            const expiryTime = new Date().getTime() + 15 * 60 * 1000; // 15 minutes
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userExpiry', expiryTime);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, error, updateUser: setUser }}>
            {children}
        </UserContext.Provider>
    );
};
