import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "types";
import { createProject } from "@/api/ProjectAPI.ts";

export default function CreateProjectView() {
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
    const handleForm = (data: ProjectFormData) => {
        createProject(data);
    };
    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500">
                    Completa el formulario para crear un nuevo proyecto
                </p>
                <nav className="my-5">
                    <Link
                        to={"/"}
                        className="bg-red-500 hover:bg-red-600 px-10 py-3 text-white text-xl font-bold cursor-pointer"
                    >
                        Volver atrás
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
                        className="bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
}
