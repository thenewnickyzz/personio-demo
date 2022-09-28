import classnames from "classnames"

import { ArrowIcon } from "@/components/Icons"

import { Applicant } from "@/types/Applicant"
import { ApplicantKey } from "@/util/keyParseMap"
import Sort from "@/types/Sort"

interface ThProps {
    cell: ApplicantKey
    children: string
    loading: boolean
    onClick: (key: ApplicantKey) => void
    sortable?: boolean
    sort: Sort
}

const Th = (props: ThProps) => {
    const { children, cell, sortable, loading, sort, onClick } = props

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

    const arrowClassName = classnames("ml-1 transition text-text-600", {
        "rotate-180": sort.key === cell && sort.direction === "DSC",
    })

    return (
        <th
            className={className}
            tabIndex={sortable ? 0 : undefined}
            onClick={() => onClick(cell)}
        >
            <div className="flex items-center">
                {children}
                {sortable && !loading && (
                    <ArrowIcon className={arrowClassName} />
                )}
            </div>
        </th>
    )
}

export default Th
