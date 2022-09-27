import classnames from "classnames"
import { Applicant } from "@/types/Applicant"
import { ArrowIcon } from "@/components/Icons"

interface ThProps {
    cell: keyof Applicant
    children: string
    sortable?: boolean
}

const Th = (props: ThProps) => {
    const { children, cell, sortable } = props

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
                {sortable && <ArrowIcon className="ml-1" />}
            </div>
        </th>
    )
}

export default Th
