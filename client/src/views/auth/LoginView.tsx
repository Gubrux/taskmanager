import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { UserLoginForm } from "@/types/index";
import { authenticateUser } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";

export default function LoginView() {
    const navigate = useNavigate();
    const initialValues: UserLoginForm = {
        email: "",
        password: "",
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            navigate("/");
        },
    });

    const handleLogin = (formData: UserLoginForm) => mutate(formData);

    return (
        <>
            <h1 className="text-3xl font-black text-white">Inicie sesión</h1>
            <p className="text-xl font-light text-white pb-2">
                Llena el formulario para {""}
                <span className=" text-sky-500 font-bold"> iniciar sesión</span>
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 mt-5 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
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

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-sky-600 hover:hover-gradient w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className="mt-6 flex flex-col space-y-4">
                <Link
                    to="/auth/register"
                    className="text-white font-semibold hover:text-sky-500"
                >
                    No tienes cuenta? Registrate
                </Link>
                <Link
                    to="/auth/forgot-password"
                    className="text-white font-semibold hover:text-sky-500"
                >
                    ¿Olivdaste tu contraseña? Reestablecela
                </Link>
            </nav>
        </>
    );
}
