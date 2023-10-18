import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import clsx from "clsx";
import Link from "next/link";

export default function SimpleCard({ className, data, ...props }: simpleCardProps) {
    return (
        <Card {...props} className={clsx("mt-6", className)}>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {data.title}
                </Typography>
                <Typography>
                    {data.body}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Link href={`/posts/${data.id}`}>
                    <Button className="bg-black text-white">Read More</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

