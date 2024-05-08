import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createAccount } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";

export default function RegisterView() {
    const initialValues: UserRegistrationForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        },
    });

    const password = watch("password");

    const handleRegister = (formData: UserRegistrationForm) => {
        mutate(formData);
    };

    return (
        <>
            <h1 className="text-3xl font-black text-white">Crear Cuenta</h1>
            <p className="text-xl font-light text-white">
                Llena el formulario para {""}
                <span className=" text-sky-500 font-bold">
                    {" "}
                    crear tu cuenta
                </span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-2 p-10  bg-white mt-4"
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
                        className="w-full p-3  border-gray-300 border"
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

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Nombre</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("name", {
                            required: "El Nombre de usuario es obligatorio",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
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
                            minLength: {
                                value: 8,
                                message:
                                    "El Password debe ser mínimo de 8 caracteres",
                            },
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">
                        Repetir Password
                    </label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: (value) =>
                                value === password ||
                                "Los Passwords no son iguales",
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>
                            {errors.password_confirmation.message}
                        </ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Registrarme"
                    className="bg-sky-500 hover:bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-500 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className="mt-2 flex flex-col font-semibold space-y-4">
                <Link
                    to="/auth/login"
                    className="text-white hover:text-sky-500"
                >
                    Ya tienes cuenta? Inicia Sesión
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
