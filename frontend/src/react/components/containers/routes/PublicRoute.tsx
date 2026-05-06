import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../../scripts/hooks/useAuth";


export const PublicRoute = ( ) => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};