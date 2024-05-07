import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    return (
        <>
            <div className="bg-slate-800 min-h-screen">
                <div className="py-10 lg:py-5 mx-auto w-[400px]">
                    <Logo />
                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    );
}
