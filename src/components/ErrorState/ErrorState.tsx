import { ErrorIcon } from "@/components/Icons"
import React from "react"

interface ErrorStateProps {
    children: any
    className?: string
}

const ErrorState = (props: ErrorStateProps) => {
    const { children, className } = props
    return (
        <div
            className={`flex flex-col  items-center justify-center ${className}`}
        >
            <ErrorIcon />
            <h3 className="mt-2 text-center text-4xl font-semibold text-text-600">
                {children}
            </h3>
        </div>
    )
}

export default ErrorState
