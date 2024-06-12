import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/api/ProfileAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { User, UserProfileForm } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ProfileViewProps = {
    data: User;
};
export default function ProfileForm({ data }: ProfileViewProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserProfileForm>({ defaultValues: data });
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
    const handleEditProfile = (formData: UserProfileForm) => mutate(formData);

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Aquí puedes actualizar tu información
                </p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200"
                            {...register("name", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >
                            E-mail
                        </label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3  border border-gray-200"
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-sky-600 w-full p-3 text-white uppercase font-bold hover:hover-gradient cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
}
