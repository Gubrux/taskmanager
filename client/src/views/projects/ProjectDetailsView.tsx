import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectsById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EdistTaskData from "@/components/tasks/EdistTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/polices";
import { useMemo } from "react";

export default function ProjectDetailsView() {
    const { data: user, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;
    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProjectsById(projectId),
        retry: false,
    });
    const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);
    console.log(canEdit);
    if (isLoading && authLoading) return "cargando...";
    if (isError) return <Navigate to="/404" />;
    if (data && user)
        return (
            <>
                <h2 className="text-5xl font-black">{data.projectName}</h2>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    {data.description}
                </p>
                <nav className="my-5 flex gap-3">
                    <Link
                        className="bg-rose-500 hover:bg-gradient-to-r from-rose-400 to-cyan-500 px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors mt-5"
                        to={`/`}
                    >
                        Volver al dashboard
                    </Link>
                    {isManager(data.manager, user._id) && (
                        <>
                            <button
                                type="button"
                                className="bg-sky-600 hover:hover-gradient px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors mt-5"
                                onClick={() =>
                                    navigate(
                                        location.pathname + "?newTask=true"
                                    )
                                }
                            >
                                Agregar Tarea
                            </button>
                            <Link
                                className="bg-teal-500 hover:hover-gradient px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors mt-5"
                                to={"team"}
                            >
                                Colaboradores
                            </Link>
                        </>
                    )}
                </nav>
                <TaskList tasks={data.tasks} canEdit={canEdit} />
                <AddTaskModal />
                <EdistTaskData />
                <TaskModalDetails />
            </>
        );
}
