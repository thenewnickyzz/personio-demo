import React from "react"
import { Applicant } from "@/types/Applicant"
import Td from "./Td"
import Th from "./Th"

export interface TableProps {
    rows: Applicant[]
    loading: boolean
    sortBy: (keyof Applicant)[]
}

type HeadingCell = { [key in keyof Applicant]: string }

const headingLabelMap: HeadingCell = {
    name: "Name",
    email: "Email",
    age: "Age",
    yearsOfExperience: "Experience (yrs)",
    positionApplied: "Position",
    dateApplied: "Applied At",
    status: "Status",
}

const cellOrder: (keyof Applicant)[] = [
    "name",
    "email",
    "age",
    "yearsOfExperience",
    "positionApplied",
    "dateApplied",
    "status",
]

const Table = (props: TableProps) => {
    const { rows, loading, sortBy } = props

    return (
        <table className="w-full table-auto">
            <thead>
                <tr className="border-b-4 border-primary-200">
                    {cellOrder.map((cell) => (
                        <Th
                            key={cell}
                            cell={cell}
                            sortable={sortBy.includes(cell)}
                        >
                            {headingLabelMap[cell]}
                        </Th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr
                        key={row.email}
                        className="border-b border-zinc-200 hover:bg-zinc-100"
                    >
                        {cellOrder.map((cell) => (
                            <Td
                                key={row.email + cell}
                                cell={cell}
                                loading={loading}
                            >
                                {row[cell]}
                            </Td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
