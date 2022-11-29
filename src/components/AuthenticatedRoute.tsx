import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "src/utils/hooks/useAuth";
import Loading from "src/components/common/Loading";

export const AuthenticatedRoute: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation();
  const { loading, user } = useAuth();
  
  if (loading) return <Loading />;

  if (user) return <>{children}</>;
  return <Navigate to="/" state={{ from: location }} replace />;
};
