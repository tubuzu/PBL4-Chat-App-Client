import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import { useGroupGuard } from '../utils/hooks/useGroupGuard';

export const GroupPageGuard: FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { loading, error } = useGroupGuard();
  if (loading) return <Loading />;
  return error ? (
    <Navigate to="/home/groups" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};
