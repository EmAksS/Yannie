import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../../scripts/hooks/useAuth";

export const ProtectedRoute = ( ) => {
  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};