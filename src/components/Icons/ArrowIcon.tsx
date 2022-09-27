import React from "react"
import classnames from "classnames"
import colors from "tailwindcss/colors"

interface ArrowIconProps {
    className?: string
}

const ArrowIcon = (props: ArrowIconProps) => {
    const { className } = props
    const classNames = classnames("h-4 w-4", className)
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke={colors.zinc[600]}
            className={classNames}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
        </svg>
    )
}

export default ArrowIcon
