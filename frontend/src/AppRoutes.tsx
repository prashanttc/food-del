import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout.tsx";
import Homepage from "./pages/Homepage.tsx";
import AuthCallback from "./pages/AuthCallback.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import ProtectedRoute from "./Auth/ProtectedRoute.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout showHero><Homepage /></Layout>}></Route>
            <Route path="/callback" element={<AuthCallback />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/user-profile" element={<Layout showHero={false}>
                    <UserProfilePage />
                </Layout>}>
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
    )
}

export default AppRoutes;