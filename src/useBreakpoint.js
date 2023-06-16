import { any } from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";

const breakpoints = {
  0: "xs",
  600: "sm",
  960: "md",
  1280: "lg",
  1920: "xl",
};

const BreakpointCtx = React.createContext();

export const BreakpointProvider = ({ children }) => {
  const [breakpoint, setBreakPoint] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const containerRef = useRef(null);

  const handleResize = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setWindowSize({
        width,
        height,
      });
    }
  };

  useEffect(() => {
    // In Gatsby this would be run without window object
    if (window) {
      window.addEventListener("resize", handleResize);
      handleResize();

      if (0 < windowSize.width && windowSize.width < 600) {
        setBreakPoint(breakpoints[0]);
      }
      if (600 < windowSize.width && windowSize.width < 960) {
        setBreakPoint(breakpoints[600]);
      }
      if (960 < windowSize.width && windowSize.width < 1280) {
        setBreakPoint(breakpoints[960]);
      }
      if (1280 < windowSize.width && windowSize.width < 1920) {
        setBreakPoint(breakpoints[1280]);
      }
      if (windowSize.width >= 1920) {
        setBreakPoint(breakpoints[1920]);
      }

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [windowSize.width]);

  return (
    <BreakpointCtx.Provider value={breakpoint}>
      <div ref={containerRef} className="w-100 h-100">
        {children}
      </div>
    </BreakpointCtx.Provider>
  );
};

BreakpointProvider.propTypes = {
  children: any,
};

export const useBreakpoint = () => {
  const breakpoint = useContext(BreakpointCtx);
  return breakpoint;
};
