import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure code runs only on the client (Next.js SSR compatibility)
    setMounted(true);
  }, []);

  // Render null until mounted to avoid SSR issues
  if (!mounted) return null;

  return createPortal(children, document.querySelector("body")!);
};

export default Portal;
