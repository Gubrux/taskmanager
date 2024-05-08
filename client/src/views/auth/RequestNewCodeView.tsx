import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { requestConfirmationCode } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";

export default function RegisterView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: "",
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        },
    });
    const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
        mutate(formData);

    return (
        <>
            <h1 className="text-5xl font-black text-white">
                Solicitar Código de Confirmación
            </h1>
            <p className="text-2xl font-light text-white mt-5">
                Coloca tu e-mail para recibir {""}
                <span className=" text-sky-500 font-bold">
                    {" "}
                    un nuevo código
                </span>
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
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
                    value="Enviar Código"
                    className="bg-sky-600 hover:bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-500 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/login"
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>
                <Link
                    to="/auth/forgot-password"
                    className="text-center text-gray-300 font-normal"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </>
    );
}
