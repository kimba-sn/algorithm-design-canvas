import {
  Button,
  ButtonGroup,
  DialogActionTrigger,
  Input,
  Text,
  Stack,
} from "@chakra-ui/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field } from "../ui/field"

interface Canvas {
  id: number;
  problem_name: string;
  problem_url: string;
}

interface EditCanvasProps {
  canvas: Canvas;
  updateCanvas: (id: number, problem_name: string, problem_url: string) => void;
}

const EditCanvas = ({ canvas, updateCanvas }: EditCanvasProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Canvas>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: canvas,
  });

  const onSubmit: SubmitHandler<Canvas> = (data) => {
    updateCanvas(canvas.id, data.problem_name, data.problem_url);
    reset();
    setIsOpen(false);
  };

  return (
    <DialogRoot
      size={{ base: "xs", md: "md" }}
      placement="top"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaEdit fontSize="16px" />
          Edit Canvas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Canvas</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Text mb={4}>Update the Canvas details below.</Text>
          <Stack gap={4}>
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
                defaultValue={canvas.problem_name}
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
                defaultValue={canvas.problem_url}
                type="text"
              />
            </Field>
          </Stack>
        </DialogBody>

        <DialogFooter gap={2}>
          <ButtonGroup>
            <DialogActionTrigger asChild>
              <Button
                variant="outline"
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </ButtonGroup>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default EditCanvas;