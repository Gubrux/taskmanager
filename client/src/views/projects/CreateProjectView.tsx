import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import { useMutation } from "@tanstack/react-query";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI.ts";

export default function CreateProjectView() {
    const navigate = useNavigate();
    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: "",
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });
    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate("/");
        },
    });
    const handleForm = (formData: ProjectFormData) => {
        mutate(formData);
    };
    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light pt-4 text-gray-500">
                    Completa el formulario para crear un nuevo proyecto
                </p>
                <nav className="my-5">
                    <Link
                        to={"/"}
                        className="bg-red-500 hover:bg-gradient-to-r from-red-500 via-red-400 to-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer"
                    >
                        Volver
                    </Link>
                </nav>
                <form
                    action=""
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <ProjectForm register={register} errors={errors} />
                    <input
                        type="submit"
                        value="Crear Proyecto"
                        className="bg-sky-500 hover:bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-500 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
}
