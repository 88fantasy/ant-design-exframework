import React, { FC, useEffect, useState, Fragment } from 'react';

export type PermissionType =
  | undefined
  | string
  | string[]
  | Promise<boolean>
  | ((currentAuthority: string | string[]) => PermissionType);

export type PermissionProps = {
  permissions: string | string[];
  keys?: string | string[] | undefined;
  noMatch?: React.ReactNode | undefined;
};

export const hasPermission = (
  permissions: string | string[],
  value: PermissionType,
): boolean => {
  const permission: string[] = Array.isArray(permissions)
    ? permissions
    : [permissions];
  if (!permission) {
    return false;
  }
  if (Array.isArray(value)) {
    if (permission.some((item) => value.includes(item))) {
      return true;
    }
  }
  if (typeof value === 'string') {
    if (permission.some((item) => item === value)) {
      return true;
    }
  }
  return false;
};

const Permission: FC<PermissionProps> = (props) => {
  const { children, noMatch, keys, permissions } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(hasPermission(permissions, keys));
  }, []);

  return <Fragment>{visible ? <>{children}</> : <>{noMatch}</>}</Fragment>;
};

export default Permission;
