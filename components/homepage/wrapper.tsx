import { cn } from "@/lib/utils";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <div className={cn("p-4 max-w-screen-xl mx-auto", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
