import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "src/components/common/Loading";
import { useConversationGuard } from "../utils/hooks/useConversationGuard";

export const ConversationPageGuard: FC<React.PropsWithChildren> = ({
  children,
}) => {
  const location = useLocation();
  const { loading, error } = useConversationGuard();
  if (loading) return <Loading />;
  return error ? (
    <Navigate to="/home/conversations" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};
