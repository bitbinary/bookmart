import React, { createContext, useState } from 'react';

export const Authenticator = createContext();

export function AuthContext({ children }) {
    const auth = SetAuthValues();

    return (
        <Authenticator.Provider value={auth}>{children}</Authenticator.Provider>
    );
}

function SetAuthValues() {
    const [authToken, setAuthtoken] = useState(
        false || localStorage.getItem('token')
    );
    const [isAdmin, setIsAdmin] = useState(null || localStorage.getItem('userClaim'))

    return {
        authToken,
        isAdmin,
        setIsAdmin,
        setAuthtoken

    };
}

