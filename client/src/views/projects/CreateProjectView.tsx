import { Link } from "react-router-dom";

export default function CreateProjectView() {
    return (
        <>
            <h1 className="text-5xl font-black">Crear Proyecto</h1>
            <p className="text-2xl font-light text-gray-500">
                Completa el formulario para crear un nuevo proyecto
            </p>
            <nav className="my-5">
                <Link
                    to={"/"}
                    className="bg-red-500 hover:bg-red-600 px-10 py-3 text-white text-xl font-bold cursor-pointer"
                >
                    Volver a la lista de proyectos
                </Link>
            </nav>
        </>
    );
}
