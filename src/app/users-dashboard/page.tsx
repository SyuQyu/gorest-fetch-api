"use client"
import { CustomTable } from '@/components/common';
import clsx from 'clsx';

export const metadata = {
    title: 'Services',
    description: 'test',
};

export default function Page() {
    return (
        <div className={clsx('flex flex-col w-full')}>
            <CustomTable />
        </div>
    );
}
