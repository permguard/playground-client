import { classNames } from "@/utils/classNames";

export interface IFormBackdropProps {
  isLoading: boolean;
  small?: boolean;
  fixed?: boolean;
}

export const FormBackdrop: React.FC<IFormBackdropProps> = ({
  isLoading,
  small,
  fixed,
}) => {
  return (
    <div
      className={classNames(
        "backdrop-blur-xs bg-white/5 absolute top-0 bottom-0 left-0 right-0 z-10 flex items-start pt-[35vh] justify-center transition duration-150 opacity-100 z-50",
        isLoading ? "" : "pointer-events-none !opacity-0",
        fixed ? "!fixed" : null
      )}
    >
      <div
        className={classNames(
          "border-gray-300 animate-spin rounded-full border-8 border-t-fuchsia-600",
          small ? "h-14 w-14" : "h-16 w-16"
        )}
      />
    </div>
  );
};
