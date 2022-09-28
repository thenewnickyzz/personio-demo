import { ArrowIcon } from "@/components/Icons"
import React from "react"

interface PaginationProps {
    page: number
    totalCount: number
    rowsPerPage: number
    onNext: () => void
    onPrevious: () => void
}

const Pagination = (props: PaginationProps) => {
    const { page, totalCount, rowsPerPage, onNext, onPrevious } = props

    const canGoNext = page * rowsPerPage < totalCount

    return (
        <div className="m-4 flex items-center justify-between">
            <div className="text-text-600">Found {totalCount} total rows</div>
            <div className="flex items-center">
                <button
                    disabled={page === 1}
                    onClick={() => onPrevious()}
                    className="rotate-90 rounded-md p-2 text-text-600 outline-primary-300 transition hover:bg-primary-200 hover:text-primary-600 active:scale-90 disabled:pointer-events-none disabled:text-text-300"
                >
                    <ArrowIcon />
                </button>
                <div className="mx-6 text-text-600">{page}</div>
                <button
                    onClick={() => onNext()}
                    disabled={!canGoNext}
                    className="-rotate-90 rounded-md p-2 text-text-600 outline-primary-300 transition hover:bg-primary-200 hover:text-primary-600 active:scale-90 disabled:pointer-events-none disabled:text-text-300"
                >
                    <ArrowIcon />
                </button>
            </div>
        </div>
    )
}

export default Pagination
