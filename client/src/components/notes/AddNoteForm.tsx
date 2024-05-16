import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoteFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";
import { toast } from "react-toastify";
import { createNote } from "@/api/NoteApi";
import { useLocation, useParams } from "react-router-dom";

export default function AddNotePanel() {
    const params = useParams();
    const projectId = params.projectId!;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;
    const initialValues: NoteFormData = {
        content: "",
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ["task", taskId] });
            reset();
            // navigate(location.pathname, { replace: true });
        },
    });

    const handleAddNote = (formData: NoteFormData) => {
        mutate({ projectId, taskId, formData });
    };
    return (
        <form
            className="space-y-3"
            noValidate
            onSubmit={handleSubmit(handleAddNote)}
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-bold">
                    Crear Nota
                </label>
                <input
                    type="text"
                    id="content"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-slate-300"
                    {...register("content", {
                        required: "Este campo es requerido",
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input
                type="submit"
                value="Crear Nota"
                className="bg-sky-600 hover:hover-gradient w-full p-2 text-white font-bold cursor-pointer"
            />
        </form>
    );
}
