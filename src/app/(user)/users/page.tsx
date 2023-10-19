'use client'
import { use, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useUsers } from '@/context/users/store';
import { CustomTable, Dialog } from '@/components/common';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';

export const metadata = {
    title: 'Portfolios',
    description: 'total description',
};

export default function Page() {

    const initialValues: User = {
        id: 0,
        name: "",
        email: "",
        gender: "",
        status: ""
    };

    const { createUser, getUsers, deleteUser, updateUser, readUser } = useUsers();
    const [valuesCreate, setValuesCreate] = useState(initialValues);
    const [valuesUpdate, setValuesUpdate] = useState(initialValues);
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const handleInputChangeCreate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValuesCreate({
            ...valuesCreate,
            [name]: value,
        });
    };

    const handleInputChangeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValuesUpdate({
            ...valuesUpdate,
            [name]: value,
        });
    };

    const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOpenCreate(!openCreate);
        createUser({ name: valuesCreate.name, email: valuesCreate.email, gender: valuesCreate.gender, status: valuesCreate.status });
        setValuesCreate(initialValues)
    };

    const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        setOpenUpdate(!openUpdate);
        updateUser(valuesUpdate.id, { name: valuesUpdate.name, email: valuesUpdate.email, gender: valuesUpdate.gender, status: valuesUpdate.status });
        setValuesUpdate(initialValues)
    };

    const handleOpenCreate = () => setOpenCreate(!openCreate);
    const handleOpenUpdate = () => setOpenUpdate(!openUpdate);

    const TABLE_HEAD = ["No", "Name", "Email", "Gender", "Status", "Action"];
    const TABLE_DATA = getUsers?.map((user, index) => ({
        no: index + 1,
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
    }));

    const handleManipulate = (id: number, text: string) => {
        if (text === 'delete') {
            deleteUser(id);
        } if (text === 'update') {
            const user = readUser(id) || initialValues;
            setValuesUpdate(user);
            handleOpenUpdate();
        }
    }

    return (
        <div className={clsx('flex flex-col w-full')}>
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        User list
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        See information about all users
                    </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Button onClick={handleOpenCreate} className="flex items-center gap-3 bg-black" size="sm">
                        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                    </Button>
                </div>
            </div>
            <Dialog open={openCreate} setOpen={setOpenCreate} handleOpen={handleOpenCreate} handleSubmit={handleSubmitCreate} submitName='Submit' title="Add Users">
                <form onSubmit={handleSubmitCreate} className="grid gap-6">
                    <Input name="name" type="text" value={valuesCreate?.name} onChange={handleInputChangeCreate} label="name" />
                    <Input name="email" type="text" value={valuesCreate?.email} onChange={handleInputChangeCreate} label="email" />
                    <Input name="gender" type="text" value={valuesCreate?.gender} onChange={handleInputChangeCreate} label="gender" />
                    <Input name="status" type="text" value={valuesCreate?.status} onChange={handleInputChangeCreate} label="status" />
                </form>
            </Dialog>
            <Dialog open={openUpdate} setOpen={setOpenUpdate} handleOpen={handleOpenUpdate} handleSubmit={handleSubmitUpdate} submitName='Submit' title="Update Users">
                <form onSubmit={handleSubmitUpdate} className="grid gap-6">
                    <Input name="id" type="text" value={valuesUpdate?.id} label="id" disabled />
                    <Input name="name" type="text" value={valuesUpdate?.name} onChange={handleInputChangeUpdate} label="name" />
                    <Input name="email" type="text" value={valuesUpdate?.email} onChange={handleInputChangeUpdate} label="email" />
                    <Input name="gender" type="text" value={valuesUpdate?.gender} onChange={handleInputChangeUpdate} label="gender" />
                    <Input name="status" type="text" value={valuesUpdate?.status} onChange={handleInputChangeUpdate} label="status" />
                </form>
            </Dialog>
            <div>
                <CustomTable tableRows={TABLE_DATA} tableHead={TABLE_HEAD} handleManipulate={handleManipulate} />
            </div>
        </div>
    );
}
