"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PrivateRouteProps, RootState } from "../../types/types";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth?.token);
  const [loading, setLoading] = useState(true);

  console.log("Token:", token);
  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router, token]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default PrivateRoute;
