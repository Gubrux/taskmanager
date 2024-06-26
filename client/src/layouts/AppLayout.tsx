import { Link, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";



export default function AppLayout() {
    const { data, isLoading, isError } = useAuth();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <Navigate to="/auth/login" />;
    if (data)
        return (
            <>
                <header className="bg-gray-800 py-5">
                    <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                        <div className="w-40">
                            <Link to="/">
                                <Logo />
                            </Link>
                        </div>
                        <NavMenu name={data.name} />
                    </div>
                </header>
                <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                    <Outlet />
                </section>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    pauseOnHover={false}
                    pauseOnFocusLoss={false}
                />
            </>
        );
}
