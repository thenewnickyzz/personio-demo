import classnames from "classnames"

import { ArrowIcon } from "@/components/Icons"

import { Applicant } from "@/types/Applicant"

interface ThProps {
    cell: keyof Applicant
    children: string
    loading: boolean
    sortable?: boolean
}

const Th = (props: ThProps) => {
    const { children, cell, sortable, loading } = props

    const className = classnames(
        "p-4",
        "text-text-600",
        "font-semibold",
        "text-sm",
        "focus:outline-primary-300",
        {
            "text-left": cell !== "age" && cell !== "yearsOfExperience",
            "text-right": cell === "age" || cell === "yearsOfExperience",
            "cursor-pointer": sortable,
        }
    )

    return (
        <th className={className} tabIndex={sortable ? 0 : undefined}>
            <div className="flex items-center">
                {children}
                {sortable && !loading && <ArrowIcon className="ml-1" />}
            </div>
        </th>
    )
}

export default Th
