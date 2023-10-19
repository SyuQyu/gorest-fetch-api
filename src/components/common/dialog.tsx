import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";

export default function MessageDialog({ open = false, setOpen, className, title = "", handleOpen = () => { }, handleSubmit = () => { }, children, submitName, ...props }: DialogProps) {
    // const [open, setOpen] = React.useState(false);

    // const handleOpen = () => setOpen(!open);

    return (
        <>
            <Dialog open={open} size="xs" handler={handleOpen} {...props}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h4">
                            {title}
                        </Typography>
                    </DialogHeader>
                </div>
                <DialogBody>
                    {children}
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    <Button variant="gradient" color="gray" onClick={handleSubmit}>
                        {submitName}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

