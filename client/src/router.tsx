import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>holo</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
