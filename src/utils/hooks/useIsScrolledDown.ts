"use client";
import { useState, useEffect } from "react";

export function useIsScrolledDown() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Function to check scroll position
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition >= 15);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup: remove event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return isScrolled;
}
