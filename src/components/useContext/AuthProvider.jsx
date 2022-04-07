import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const siginIn = (newUser, cb) => {
        setUser(newUser);
        cb();
    };

    const signOut = (cb) => {
        setUser(null);
        cb();
    };

    const value = { user, siginIn, signOut };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
