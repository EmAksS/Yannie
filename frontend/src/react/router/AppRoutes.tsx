import URLS from "../../constants/urls";

import {Routes, Route, Navigate} from "react-router-dom";
import { ProtectedRoute } from "../components/containers/routes/ProtectedRoute";
import { PublicRoute } from "../components/containers/routes/PublicRoute";
import { AuthPage } from "../pages/auth/AuthPage";
import { HomePage } from "../pages/home/HomePage";
import MainLayout from "../components/containers/layout/MainLayout/MainLayout";


export const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path={URLS.HOME} element={<HomePage />} />
      </Route>
      

      <Route element={<PublicRoute/>}>
        <Route path={URLS.AUTH} element={<AuthPage />} />
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={URLS.HOME} replace />} />
    </Routes>
  );
}