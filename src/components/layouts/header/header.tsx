import clsx from 'clsx';
import Link from 'next/link';

export default function Header({ className }: Props) {
    return (
        <header id='header' className={clsx('header', className)}>
            <span>Header Section</span>
            <div className='flex flex-row justify-between items-center space-x-8'>
                <Link href='/'>Home</Link>
                <Link href='/services'>Services</Link>
                <Link href='/portfolios'>Portfolios</Link>
            </div>
        </header>
    );
}

type Props = {
    className?: string;
};
