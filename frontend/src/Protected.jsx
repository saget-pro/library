import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/dashboard",
        { withCredentials: true }
      );

      if (res.status === 200) {
        setIsAuth(true);
      }
    } catch (error) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Loading
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Redirect if not authenticated
  if (!isAuth) {
    return <Navigate to="/" />;
  }

  // Show child routes
  return <Outlet />;
}

export default Protected;