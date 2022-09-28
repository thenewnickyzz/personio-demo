import React, {
    ChangeEvent,
    createRef,
    FormEvent,
    useMemo,
    useState,
} from "react"

import Menu from "@/components/Autocomplete/Menu"
import useExtractEnumData from "@/components/Autocomplete/useExtractEnumData"
import { SearchableKey, searchTypesMap } from "@/components/Autocomplete/util"
import { SearchIcon } from "@/components/Icons"

import { Applicant } from "@/types/Applicant"
import keyParseMap from "@/util/keyParseMap"

interface AutocompleteProps {
    searchKeys: SearchableKey[]
    onSubmit: (data: { key: SearchableKey; value: string }) => void
    loading: boolean
    data: Applicant[]
}

const Autocomplete = (props: AutocompleteProps) => {
    const { searchKeys, onSubmit, loading, data } = props

    const inputRef = createRef<HTMLInputElement>()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [selectedKey, setSelectedKey] = useState<SearchableKey | undefined>(
        undefined
    )
    const [searchValue, setSearchValue] = useState<string>("")

    const enumData = useExtractEnumData(data, selectedKey)

    const onColumnSelect = (label: string) => {
        if (!selectedKey) {
            setSelectedKey(label as SearchableKey)
        } else {
            setSearchValue(label)
        }

        inputRef.current?.focus()

        if (searchTypesMap[label as SearchableKey] !== "enum") {
            setIsMenuOpen(false)
        }
    }

    const inputValue = useMemo(() => {
        if (selectedKey) {
            return `${keyParseMap[selectedKey]}:${searchValue}`
        }
        return ""
    }, [selectedKey, searchValue])

    const onInputClick = () => {
        if (selectedKey) {
            return
        }
        setIsMenuOpen(true)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Prevent typing until a key has been selected
        if (!selectedKey) {
            return
        }

        const value = e.target.value

        if (!value) {
            return
        }

        const [_key, realValue] = value.split(":")

        // We delete the key
        if (realValue === undefined) {
            setSelectedKey(undefined)
            setIsMenuOpen(true)
            return
        }

        // We want to allow only the deletion of enum values but not free typing
        if (searchTypesMap[selectedKey] === "enum") {
            if (realValue.length < searchValue.length) {
                setSearchValue("")
                setIsMenuOpen(true)
            }
            return
        }

        setSearchValue(realValue)
    }

    const onClose = () => {
        setIsMenuOpen(false)
    }

    const onAdd = (e: FormEvent) => {
        e.preventDefault()

        if (!selectedKey) {
            return
        }

        onSubmit({
            key: selectedKey,
            value: searchValue,
        })

        setSearchValue("")
        setSelectedKey(undefined)
    }

    return (
        <form className="flex items-start" onSubmit={onAdd}>
            <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <SearchIcon />
                </div>
                <input
                    ref={inputRef}
                    onFocus={onInputClick}
                    onClick={onInputClick}
                    type="text"
                    id="input-group-1"
                    disabled={loading}
                    className="
                    block w-full rounded-lg border border-zinc-300 bg-zinc-100 py-4 pr-2.5 pl-11
                    text-text-700 placeholder:text-text-400 hover:border-primary-400 focus:outline-primary-400
                    disabled:border-zinc-200 disabled:text-text-300 disabled:placeholder:text-text-300
                "
                    placeholder="Column:Search"
                    value={inputValue}
                    onChange={onInputChange}
                />
                {isMenuOpen && (
                    <Menu
                        searchKeys={searchKeys}
                        onClick={onColumnSelect}
                        onClose={onClose}
                        enumData={enumData as string[]}
                    />
                )}
            </div>
            <button
                disabled={loading || !selectedKey || !searchValue}
                className="
                    ml-4 rounded-lg bg-primary-600 py-4 px-8 font-medium text-white outline-primary-300 transition hover:bg-primary-700
                    active:scale-90 disabled:pointer-events-none disabled:bg-zinc-300
                "
            >
                Add
            </button>
        </form>
    )
}

export default Autocomplete
