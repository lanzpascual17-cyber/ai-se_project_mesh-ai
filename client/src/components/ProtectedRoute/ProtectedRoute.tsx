import {
  Navigate,
  Outlet,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const context = useOutletContext();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet context={context} />;
}

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={location.state?.from ?? "/knowledge"} replace />;
  }

  return <Outlet />;
}
