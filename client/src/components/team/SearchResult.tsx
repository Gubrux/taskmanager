import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TeamMember } from "@/types/index";
import { addUserToProject } from "@/api/TeamAPI";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type SearchResultProps = {
    user: TeamMember;
    reset: () => void;
};

export default function SearchResult({ user, reset }: SearchResultProps) {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({queryKey: ["projectTeam", projectId]});
            reset();
            navigate(location.pathname, {replace: true})
        },
    });
    const handleAddUserToProject = async () => {
        const data = {
            projectId,
            id: user._id,
        };
        mutate(data);
    };

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>

                <button
                    className="text-white bg-sky-500 hover:hover-gradient px-10 py-3 font-bold cursor-pointer"
                    onClick={handleAddUserToProject}
                >
                    Agregar al proyecto
                </button>
            </div>
        </>
    );
}
