import React from "react";

interface IRHFFormHelperErrorProps {
  name?: string;
  error?: { message?: string };
  color?: string;
}

export const RHFFormHelperError: React.FC<IRHFFormHelperErrorProps> = ({
  name,
  error,
}) => {
  return error ? (
    <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
      {error.message}
    </p>
  ) : null;
};
