interface Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
}

interface Comment {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
}

interface User {
    id?: any;
    name: string;
    email: string;
    gender: string;
    status: string;
}

interface simpleCardProps {
    className?: string;
    data: {
        id: number;
        user_id: number;
        title: string;
        body: string;
    }
}

interface DialogProps {
    title?: string;
    children?: React.ReactNode;
    handleOpen?: (e: any) => void;
    handleSubmit?: (e: any) => void;
    open?: boolean | false;
    setOpen?: any;
    submitName?: string;
    className?: any;
};

