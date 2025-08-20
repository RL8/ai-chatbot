"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export const HeaderComponent: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  actions,
  className
}) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700",
      className
    )}>
      {/* Left side - Back button or spacer */}
      <div className="flex items-center min-w-0 flex-1">
        {showBack && onBack ? (
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="flex items-center gap-2 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        ) : (
          <div className="w-10 flex-shrink-0" />
        )}
      </div>

      {/* Center - Title with truncation */}
      <div className="flex-1 min-w-0 px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate text-center">
          {title}
        </h2>
      </div>

      {/* Right side - Actions or spacer */}
      <div className="flex items-center min-w-0 flex-1 justify-end">
        {actions ? (
          <div className="flex-shrink-0">
            {actions}
          </div>
        ) : (
          <div className="w-10 flex-shrink-0" />
        )}
      </div>
    </div>
  );
};

