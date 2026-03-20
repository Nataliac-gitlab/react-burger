import React from "react";
import { getStatusDetailes } from "../utils/utils";

type StatusProps = {
  status: string;
};

export const Status = ({ status }: StatusProps) => {
  if (!status) return null;
  const statusObj = getStatusDetailes(status);
  if (!statusObj) return null;

  return <div style={{ color: statusObj.color }}>{statusObj.title}</div>;
};
