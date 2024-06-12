import React, { HTMLAttributes, ReactNode } from "react";

interface btnProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    startIcon?: ReactNode;
    endIcon?: ReactNode,
    className?: string
}

const Button: React.FC<btnProps> = ({ children, startIcon, endIcon, className }) => {
    return (
        <button className={`flex gap-1 items-center bg-green-100 text-green-600 py-2 px-4 text-sm font-medium capitalize rounded-md ${className}`}>
            {startIcon && startIcon}
            {children}
            {endIcon && endIcon}
        </button>
    )
}

export default Button;