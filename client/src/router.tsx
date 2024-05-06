import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardView from "@/views/DashboardView";
import AppLayout from "@/layouts/AppLayout";
import "./index.css";
import CreateProjectView from "@/views/projects/CreateProjectView";
import EditProjectView from "@/views/projects/EditProjectView";
import ProjectDetailsView from "@/views/projects/ProjectDetailsView";

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
                    <Route
                        path="/projects/:projectId"
                        element={<ProjectDetailsView />}
                    />
                </Route>
                <Route
                    path="/projects/:projectId/edit"
                    element={<EditProjectView />}
                />
            </Routes>
        </BrowserRouter>
    );
}
