"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IProps, RootState } from "../../types/types";
import { Balls } from "../Balls";

const PrivateRoute: React.FC<IProps> = ({ children }) => {
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
    return <Balls />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
