import { UsersProvider } from '@/context/users/store';
import clsx from 'clsx';


export default function UserLayout({ children }: Props) {
    return (
            <UsersProvider>
                {children}
            </UsersProvider>
    );
}

type Props = {
    children: React.ReactNode;
};
