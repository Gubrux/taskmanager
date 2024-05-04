import { Link } from "react-router-dom";
export default function DashboardView() {
    return (
        <>
            <h1 className="text-5xl font-black">Mis Proyectos</h1>
            <p className="text-2xl font-light text-gray-500">
                Administra tus proyectos
            </p>
            <nav className="my-5">
                <Link
                    to={"/Projects/create"}
                    className="bg-red-500 hover:bg-red-600 px-10 py-3 text-white text-xl font-bold cursor-pointer"
                >
                    Nuevo Proyecto
                </Link>
            </nav>
        </>
    );
}
