import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  // Redirect to respective verification/onboarding if not verified
  if (user.verificationStatus !== "verified") {
    if (user.role === "officer") return <Navigate to="/verify/officer" />;
    if (user.role === "farmer") return <Navigate to="/onboarding/farmer" />;
    return <Navigate to="/choose-role" />;
  }

  return children;
}

export default ProtectedRoute;