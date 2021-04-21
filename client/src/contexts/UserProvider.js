import { useState, useEffect, useContext } from "react";

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ id, children }) {
    const [user, setUser] = useState();

    useEffect(() => {}, [user]);

    return (
        <UserProvider.Provider value={user}>{children}</UserProvider.Provider>
    );
}
