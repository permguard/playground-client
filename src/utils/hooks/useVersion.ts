import { useState, useCallback, useEffect } from "react";

export const VERSIONS = ["0.0.x"];
export const LATEST_VERSION = VERSIONS[VERSIONS.length - 1];

// Define types
interface VersionInfo {
  currentVersion: string;
  allVersions: string[];
  isLatest: boolean;
  basePath: string;
}

export function useVersion() {
  // Initialize version from localStorage or default to LATEST_VERSION
  const [currentVersion, setCurrentVersion] = useState(LATEST_VERSION);

  useEffect(() => {
    const storedVersion = localStorage.getItem("appVersion");

    if (storedVersion && VERSIONS.includes(storedVersion)) {
      setCurrentVersion(storedVersion ?? LATEST_VERSION);
    }
  }, []);

  // Update localStorage when version changes
  useEffect(() => {
    localStorage.setItem("appVersion", currentVersion);
  }, [currentVersion]);

  // Generate version info object
  const versionInfo: VersionInfo = {
    currentVersion,
    allVersions: VERSIONS,
    isLatest: currentVersion === LATEST_VERSION,
    basePath: "/docs", // Assuming DOCS_BASE_PATH was "/docs"
  };

  // Function to switch version
  const switchVersion = useCallback((version: string) => {
    if (!VERSIONS.includes(version)) {
      console.warn(
        `Version ${version} is not in the list of available versions`
      );
      return;
    }
    setCurrentVersion(version);
  }, []);

  return {
    ...versionInfo,
    switchVersion,
  };
}
