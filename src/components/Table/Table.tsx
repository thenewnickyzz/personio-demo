import dayjs from "dayjs"
import randomWords from "random-words"
import React from "react"

import Td from "./Td"
import Th from "./Th"

import { Applicant } from "@/types/Applicant"

export interface TableProps {
    rows: Applicant[]
    loading: boolean
    sortBy: (keyof Applicant)[]
    className?: string
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

const loadingRows: Applicant[] = [...new Array(10)].fill(0).map(() => ({
    name: randomWords({ min: 1, max: 3, join: " " }),
    email: `${randomWords({ exactly: 2, join: "." })}@gmail.com`,
    age: 25,
    positionApplied: "Front-End Engineer",
    status: "waiting",
    dateApplied: dayjs().toDate(),
    yearsOfExperience: 20,
}))

const Table = (props: TableProps) => {
    const { rows, loading, sortBy, className } = props

    const data = loading ? loadingRows : rows

    return (
        <table className={`w-full table-auto ${className}`}>
            <thead>
                <tr className="border-b-4 border-primary-200">
                    {cellOrder.map((cell) => (
                        <Th
                            key={cell}
                            loading={loading}
                            cell={cell}
                            sortable={sortBy.includes(cell)}
                        >
                            {headingLabelMap[cell]}
                        </Th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
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
