"use client"
import { getUsers, createUser as createUserApi } from '@/api/user';
import { CustomTable } from '@/components/common';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useUsers } from '@/context/users/store';

export default async function Page() {
    const { getUsers, createUser } = useUsers();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createUser({ name, email, gender, status });
        setName('');
        setEmail('');
        setGender('');
        setStatus('');
    };

    useEffect(() => {
        console.log(getUsers, 'users')
    })

    return (
        <div className={clsx('flex flex-col w-full')}>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Gender:
                    <input type="text" value={gender} onChange={handleGenderChange} />
                </label>
                <label>
                    Status:
                    <input type="text" value={status} onChange={handleStatusChange} />
                </label>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}
