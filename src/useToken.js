import { useState } from 'react';

export default function useToken() {
    function getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }
    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    }

    return {
        token,
        setToken: saveToken
    }
}