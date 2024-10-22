import React, { createContext, useState, ReactNode } from 'react';

interface UserProfile {
    name: string;
    pictureUrl: string;
    bio: string;
}

interface UserContextType {
    user: UserProfile;
    setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile>({
        name: 'Bob',
        pictureUrl: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png',
        bio: 'Hi, nice to meet you!'
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};