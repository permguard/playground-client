import { copyToClipboard } from "@/utils/copyToClipboard";
import { Icon } from "@iconify/react";
import { useCallback, useState, MouseEvent } from "react";

interface ICopyButtonProps {
  size?: number;
  content?: string;
}

export const CopyButton: React.FC<ICopyButtonProps> = ({
  content,
  size = 18,
}) => {
  const [showLabel, setShowLabel] = useState(false);

  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      copyToClipboard(content ?? "");
    },
    [content]
  );

  return (
    <button
      className="rounded-full text-gray-400 hover:text-gray-500"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      onClick={onClick}
    >
      <Icon icon="bx:copy" fontSize={size} />
      <div
        className={`absolute z-50 ${
          showLabel ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } bg-zinc-700 text-white p-2 rounded mt-1 text-sm transition-all duration-300 ease-in-out transform origin-top ${
          showLabel ? "visible" : "invisible"
        }`}
      >
        <span>Copy</span>
      </div>
    </button>
  );
};
