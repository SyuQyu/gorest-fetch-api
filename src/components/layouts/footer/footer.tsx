import clsx from 'clsx';

export default function Footer({ className }: Props) {
    return (
        <footer id='footer' className={clsx('footer', className)}>
            <span className='text-sm text-gray-500'>All Right Reserved @Pandu Utomo</span>
        </footer>
    );
}

type Props = {
    className?: string;
};
