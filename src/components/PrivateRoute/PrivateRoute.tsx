"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, ReactNode } from "react";
import { PrivateRouteProps, RootState } from "../../types/types";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth?.token);

  useEffect(() => {
    if (typeof window !== "undefined" && !token) {
      router.push("/login");
    }
  }, [router, token]);

  if (!token) return null;

  return <>{children}</>;
};

export default PrivateRoute;
