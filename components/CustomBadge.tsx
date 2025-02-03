import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

export const CustomBadge = ({ children, className }: BadgeProps) => {
    return (
        <span className={`inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 text-sm rounded-full ${className}`}>
            <span className="w-2 h-2 bg-white rounded-full"></span>
            {children}
        </span>
    );
};