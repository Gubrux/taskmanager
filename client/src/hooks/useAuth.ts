import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";

export function useAuth() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });
    return { data, isLoading, isError };
}
