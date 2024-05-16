import { Link } from "react-router-dom";
import Spaceman from "./Spaceman";
import Logo from "@/components/Logo";

export default function NotFound() {
    return (
        <>
            <div className="bg-slate-800 h-screen w-screen flex flex-col items-center justify-center px-4 sm:px-0">
                <div className="w-full sm:w-[500px]">
                    <Logo />
                </div>
                <div className="py-10 lg:py-5 mx-auto w-full sm:w-[500px] lg:w-[1000px]">
                    <h1 className="font-black text-center text-4xl text-white pb-4">
                        Pagina no encontrada
                    </h1>
                    <Spaceman />
                    <p className="mt-10 text-center text-white text-4xl">
                        Volver a{" "}
                        <Link className="text-sky-500 hover:underline" to={"/"}>
                            Proyectos
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
