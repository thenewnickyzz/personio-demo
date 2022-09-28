import classnames from "classnames"
import day from "dayjs"
import { useMemo } from "react"

import { Applicant } from "@/types/Applicant"

interface TdProps {
    cell: keyof Applicant
    loading: boolean
    children: any
}
const Td = (props: TdProps) => {
    const { children, cell, loading } = props

    const value = useMemo(() => {
        if (cell === "dateApplied") {
            return day(children).format("DD/MM/YY")
        }
        return children
    }, [])

    const className = classnames("p-4", "text-text-700", {
        capitalize: cell !== "email",
        "text-left": cell !== "age" && cell !== "yearsOfExperience",
        "text-right": cell === "age" || cell === "yearsOfExperience",
    })

    return (
        <td className={className}>
            {!loading ? (
                value
            ) : (
                <div className="max-w-sm animate-pulse">
                    <div className="h-5 rounded-lg bg-zinc-200"></div>
                </div>
            )}
        </td>
    )
}
export default Td
