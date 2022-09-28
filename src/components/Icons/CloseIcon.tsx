import React from "react"

interface CloseIconProps {
    className?: string
}

const CloseIcon = (props: CloseIconProps) => {
    const { className } = props

    const svgClassName = className || "h-6 w-6"

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={svgClassName}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    )
}

export default CloseIcon
