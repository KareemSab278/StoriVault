import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

// This component checks if a user is authenticated before allowing access to certain routes.
