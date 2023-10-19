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
            console.log(data.data, 'fetch users');
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
            const response = await fetch(`${BASE_URL}?access-token=${ACCESS_TOKEN}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            console.log(data.data, 'create user');
            setUsers([...users, data.data]);
        } catch (error) {
            console.error(error);
        }
    };

    const readUser = (id: number) => users.find((user) => user.id === id);

    const updateUser = async (id: number, user: User) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}?access-token=${ACCESS_TOKEN}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            setUsers(users.map((user) => (user.id === id ? data.data : user)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await fetch(`${BASE_URL}/${id}?access-token=${ACCESS_TOKEN}`, {
                method: "DELETE",
            });
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
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
