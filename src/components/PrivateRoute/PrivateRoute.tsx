"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IProps, RootState } from "../../types/types";

const PrivateRoute: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth?.token);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
    }
  }, [router, token]);

  return <>{children}</>;
};

export default PrivateRoute;
