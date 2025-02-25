import { useForm, type SubmitHandler } from "react-hook-form";
import {
    Button,
    Input,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
    DialogBody,
    DialogActionTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Field } from "../ui/field";

import { Canvas } from "../../types";

interface AddCanvasProps {
    addNewCanvas: (problemName: string, problemUrl: string) => void;
}

const AddCanvas = ({ addNewCanvas }: AddCanvasProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Canvas>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            problem_name: "",
            problem_url: "",
        },
    });

    const onSubmit: SubmitHandler<Canvas> = (data) => {
        addNewCanvas(data.problem_name, data.problem_url);
        setIsOpen(false);
        reset();
    };

    return (

        <DialogRoot placement="top" open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" value="add-item" my={4}>
                    <FaPlus fontSize="16px" />
                    Add New Canvas
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Canvas</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                    <Stack gap="4">
                        <Field
                            required
                            invalid={!!errors.problem_name}
                            errorText={errors.problem_name?.message}
                            label="Problem Name"
                        >
                            <Input
                                id="problem_name"
                                {...register("problem_name", {
                                    required: "Problem is required.",
                                })}
                                placeholder="Problem Name"
                                type="text"
                            />
                        </Field>

                        <Field
                            invalid={!!errors.problem_url}
                            errorText={errors.problem_url?.message}
                            label="Problem URL"
                        >
                            <Input
                                id="problem_url"
                                {...register("problem_url")}
                                placeholder="Problem URL"
                                type="text"
                            />
                        </Field>
                    </Stack>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button onClick={handleSubmit(onSubmit)}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};

export default AddCanvas;