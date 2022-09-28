import React from "react"

import { CloseIcon } from "@/components/Icons"

interface ListItemProps {
    children: string
    onClick: (label: string) => void
}

const ListItem = (props: ListItemProps) => {
    const { children, onClick } = props

    const onEnter = (e: React.KeyboardEvent<HTMLLIElement>) => {
        if (e.code !== "Enter") {
            return
        }
        onClick(children)
    }

    return (
        <li
            className="w-full cursor-pointer border-b border-zinc-200
            py-4 px-5 text-text-500 outline-primary-300 hover:bg-zinc-100"
            tabIndex={0}
            onClick={() => onClick(children)}
            onKeyDown={onEnter}
        >
            {children}
        </li>
    )
}

interface MenuProps {
    onClose: () => void
    searchKeys: string[]
    onClick: (label: string) => void
    enumData: string[]
}

const Menu = (props: MenuProps) => {
    const { onClose, searchKeys, onClick, enumData } = props

    const data = enumData.length ? enumData : searchKeys

    return (
        <div className="absolute top-full w-full bg-white">
            <div className="flex items-center justify-between px-5 pt-4 pb-6 text-lg font-medium text-text-600">
                <span>Filter by:</span>
                <button
                    onClick={onClose}
                    className="rounded-full p-2 outline-primary-300 transition hover:bg-primary-200 hover:text-primary-600"
                >
                    <CloseIcon />
                </button>
            </div>
            <ul>
                {data.map((key) => (
                    <ListItem key={key} onClick={onClick}>
                        {key}
                    </ListItem>
                ))}
            </ul>
        </div>
    )
}

export default Menu
