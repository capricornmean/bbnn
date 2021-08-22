import { useState } from 'react';

export default function useToken() {
    function getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }
    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        if (userToken.token) {
            localStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken.token);
        }
        else{
            localStorage.clear();
            setToken();
        }
    }

    return {
        token,
        setToken: saveToken
    }
}