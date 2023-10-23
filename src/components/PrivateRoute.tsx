import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface PrivateRouteProps {
  children: any;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
}

export default PrivateRoute;
