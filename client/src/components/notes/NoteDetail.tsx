import { deleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/Formatter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
    note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
    const { data, isLoading } = useAuth();

    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const projectId = params.projectId!;
    const taskId = queryParams.get("viewTask")!;
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ["task", taskId] });
        },
    });

    if (isLoading) return "Cargando...";
    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p className="">
                    {note.content} por:{" "}
                    <span className="font-bold text-cyan-500">
                        {note.createdBy.name}
                    </span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && (
                <button
                    className="bg-red-400 hover:bg-red-500 text-xs p-2 text-white cursor-pointer transition-colors font-bold"
                    onClick={() => mutate({ projectId, taskId, noteId: note._id})}
                >
                    Eliminar
                </button>
            )}
        </div>
    );
}
