const BASE_URL = 'https://gorest.co.in/public-api/users';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
import { createContext, useContext } from "react";
// CREATE
export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`,
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create user');
    }
};

// READ
export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get users');
    }
};

export const getUserById = async (id: number): Promise<User> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to get user with id ${id}`);
    }
};

// UPDATE
export const updateUser = async (user: User): Promise<User> => {
    try {
        const response = await fetch(`${BASE_URL}/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`,
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to update user with id ${user.id}`);
    }
};

// DELETE
export const deleteUser = async (id: number): Promise<void> => {
    try {
        await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN ? ACCESS_TOKEN : 'ffea57b5bc7030984ef16cb51577673e38048bb20d142cf61b7b7aa56c560b63'}`,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to delete user with id ${id}`);
    }
};
