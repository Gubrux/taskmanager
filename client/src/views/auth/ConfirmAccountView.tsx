import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken["token"]>("");
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate("/");
        },
    });
    const handleChange = (token: ConfirmToken["token"]) => {
        setToken(token);
    };
    const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });
    return (
        <>
            <h1 className="text-5xl font-black text-gray-100">
                Confirma tu Cuenta
            </h1>
            <p className="text-2xl font-light text-gray-100 mt-5">
                Ingresa el código que recibiste <br />
                <span className=" text-sky-500 font-bold underline">
                    {" "}
                    por e-mail
                </span>
            </p>
            <form className="space-y-8 p-10 bg-gray-100 mt-10">
                <label className="font-normal text-2xl text-center block">
                    Código de 6 dígitos
                </label>
                <div className="flex justify-center gap-5">
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                    >
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-400 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-400 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-400 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-400 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-400 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-slate-400 border placeholder-white" />
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/request-code"
                    className="text-center text-gray-300 font-normal hover:text-sky-500"
                >
                    Solicitar un nuevo Código
                </Link>
                <Link
                    to="/auth/login"
                    className="text-center text-gray-300 font-normal underline hover:text-sky-500"
                >
                    O volver al inicio de sesión
                </Link>
            </nav>
        </>
    );
}
