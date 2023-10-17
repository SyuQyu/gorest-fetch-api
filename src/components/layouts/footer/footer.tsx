import clsx from 'clsx';

export default function Footer({ className }: Props) {
    return (
        <footer id='footer' className={clsx('footer', className)}>
            <span>Footer Section</span>
        </footer>
    );
}

type Props = {
    className?: string;
};
