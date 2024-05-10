import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "@/components/projects/ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProject } from "@/api/ProjectAPI";

type EditProjectFormProps = {
    data: ProjectFormData;
    projectId: Project["_id"];
};

export default function EditProjectForm({
    data,
    projectId,
}: EditProjectFormProps) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description,
        },
    });
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({
                queryKey: ["editProject", projectId],
            });
            toast.success(data);
            navigate("/");
        },
    });

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId,
        };
        mutate(data);
    };
    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light pt-4 text-gray-500">
                    Completa el formulario para editar el proyecto
                </p>
                <nav className="my-5">
                    <Link
                        to={"/"}
                        className="bg-red-500 hover:bg-red-600 px-10 py-3 text-white text-xl font-bold cursor-pointer"
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
                        value="Editar Proyecto"
                        className="bg-sky-500 hover:hover-gradient w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
}
