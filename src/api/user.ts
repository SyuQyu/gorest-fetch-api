

const BASE_URL = 'https://gorest.co.in/public-api/users';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

// CREATE
export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    return data.data;
};

// READ
export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
    const data = await response.json();
    return data.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
    const data = await response.json();
    return data.data;
};

// UPDATE
export const updateUser = async (user: User): Promise<User> => {
    const response = await fetch(`${BASE_URL}/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    return data.data;
};

// DELETE
export const deleteUser = async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
};
