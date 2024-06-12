import React, { HTMLAttributes, ReactNode } from "react"

interface input_prop extends HTMLAttributes<HTMLInputElement> {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    className?: string;
    placeholder?: string;
    value: string
}

const Input: React.FC<input_prop> = ({ startIcon, endIcon, className, placeholder, value }) => {
    return (
        <div className="flex items-center relative w-[25rem]">
            {startIcon && (<span className="absolute text-white left-2">{startIcon}</span>)}
            <input
                className={`bg-[#3d3d3d] w-full p-2 text-white outline-none placeholder:text-white rounded-md ${startIcon && "pl-[35px]"} ${endIcon && "pr-[35px]"} caret-white ${className}`}
                placeholder={placeholder}
                value={value}
            />
            {endIcon && (<span className="absolute text-white right-2">{endIcon}</span>)}
        </div>
    )
}

export default Input