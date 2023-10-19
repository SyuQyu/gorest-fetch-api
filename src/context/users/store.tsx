'use client'
const BASE_URL = 'https://gorest.co.in/public-api/users';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

import { createContext, useContext, useState, useEffect } from "react";

interface UsersContextType {
    getUsers: User[];
    createUser: (user: User) => void;
    readUser: (id: number) => User | undefined;
    updateUser: (id: number, user: User) => void;
    deleteUser: (id: number) => void;
}

export const UsersContext = createContext<UsersContextType>({
    getUsers: [],
    createUser: () => { },
    readUser: () => undefined,
    updateUser: () => { },
    deleteUser: () => { },
});

export const useUsers = () => useContext(UsersContext);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const fetchUsers = async () => {
        try {
            const response = await fetch(BASE_URL, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`,
                },
            });
            const data = await response.json();
            setUsers(data.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const getUsers = users;

    const createUser = async (user: User) => {
        try {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`,
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            setUsers([...users, data.data]);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const readUser = (id: number) => {
        const user = users.find((user) => user.id === id);
        return user;
    };

    const updateUser = async (id: any, user: User) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`,
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            setUsers(users.map((user) => (user.id === id ? data.data : user)));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await fetch(`${BASE_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`,
                }
            });
            setUsers(users.filter((user) => user.id !== id));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return (
        <UsersContext.Provider
            value={{ getUsers, createUser, readUser, updateUser, deleteUser }}
        >
            {children}
        </UsersContext.Provider>
    );
};
