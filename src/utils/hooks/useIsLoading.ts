"use client";
import { useState, useEffect } from "react";

function useIsLoading(enable?: boolean) {
  const [isLoading, setIsLoading] = useState(enable ?? true);

  useEffect(() => {
    if (enable) {
      const interval = setInterval(() => {
        setIsLoading((prevIsLoading) => !prevIsLoading);
      }, 2000);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 750);

      return () => clearTimeout(timeout);
    }
  }, [enable]);

  return isLoading;
}

export default useIsLoading;
