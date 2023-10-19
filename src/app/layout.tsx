import clsx from 'clsx';
import '@/styles/index.scss';
import { POPPINS, ROBOTO_MONO } from '@/contants/fonts';

import DefaultLayout from '@/components/layouts/default-layouts';
import { BlogsProvider } from '@/context/blogs/store';

export const metadata = {
    title: {
        default: 'Gorest Fetch Api',
        template: '%s | Gorest.co',
    },
    description: 'Peluang.co tes desc',
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang='en' className={clsx('scroll-smooth', POPPINS.variable, ROBOTO_MONO.variable)}>
            <BlogsProvider><DefaultLayout>{children}</DefaultLayout></BlogsProvider>

        </html>
    );
}

type Props = {
    children: React.ReactNode;
};
