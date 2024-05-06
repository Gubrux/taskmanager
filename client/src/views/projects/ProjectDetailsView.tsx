import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectsById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EdistTaskData from "@/components/tasks/EdistTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";

export default function ProjectDetailsView() {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;
    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectsById(projectId),
        retry: false,
    });
    if (isLoading) return "cargando...";
    if (isError) return <Navigate to="/404" />;
    if (data)
        return (
            <>
                <h1 className="text-5xl font-black">{data.projectName}</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    {data.description}
                </p>
                <nav>
                    <button
                        type="button"
                        className="bg-sky-500 hover:bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-500 px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors mt-5"
                        onClick={() =>
                            navigate(location.pathname + "?newTask=true")
                        }
                    >
                        Agregar Tarea
                    </button>
                    <TaskList tasks={data.tasks} />
                    <AddTaskModal />
                    <EdistTaskData />
                    <TaskModalDetails />
                </nav>
            </>
        );
}
