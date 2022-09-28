import { CloseIcon } from "@/components/Icons"
import Filter from "@/types/Filter"
import keyParseMap, { ApplicantKey } from "@/util/keyParseMap"
import classNames from "classnames"
import React from "react"

interface TagProps {
    keyCol: string
    value: string
    loading: boolean
    onClick: (filter: Filter) => void
}

const Tag = (props: TagProps) => {
    const { keyCol, value, loading, onClick } = props

    const className = classNames(
        "inline-flex items-center rounded-lg bg-primary-200 p-2 text-xs font-medium text-primary-700",
        { "bg-gray-200 text-text-400": loading }
    )
    return (
        <div className={className}>
            {keyParseMap[keyCol as ApplicantKey]}:{value}
            <button
                onClick={() => onClick({ key: keyCol, value })}
                disabled={loading}
                className="ml-2 rounded-full p-1 outline-primary-700 transition  hover:bg-primary-300 disabled:pointer-events-none "
            >
                <CloseIcon className=" h-4 w-4" />
            </button>
        </div>
    )
}

export default Tag
