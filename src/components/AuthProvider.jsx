import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider(props) {
    const children = props.children;
    const [currentUserEmail, setCurrentUserEmail] = useState("");
    const [accessToken, setAccessToken] = useState("");

    const login = (email, token) => {
        setCurrentUserEmail(email);
        setAccessToken(token);
    };

    const logout = () => {
        setCurrentUserEmail("");
        setAccessToken("");
    };

    return (
        <AuthContext.Provider value={{ currentUserEmail, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
