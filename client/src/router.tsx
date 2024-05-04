import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardView from "./views/DashboardView";
import AppLayout from "@/layouts/AppLayout";
import "./index.css";
import CreateProjectView from "./views/projects/CreateProjectView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route
                        path="/projects/create"
                        element={<CreateProjectView />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
