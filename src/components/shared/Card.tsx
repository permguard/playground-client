import { classNames } from "@/utils/classNames";
import React from "react";

interface ICardProps {
  className?: string | null;
  children?: React.ReactNode | null;
}

export const Card: React.FC<ICardProps> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        "mt-5 sm:mt-6 p-6 rounded-[25px] bg-[#1E1F23] sm:min-h-[650px] xl:min-h-[580px]",
        className
      )}
    >
      {children}
    </div>
  );
};
