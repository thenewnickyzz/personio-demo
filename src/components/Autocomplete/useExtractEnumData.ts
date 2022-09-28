import { SearchableKey, searchTypesMap } from "./util"
import { Applicant } from "@/types/Applicant"
import { useMemo } from "react"

// Extract all unique values by a given key
const useExtractEnumData = (
    data: Applicant[],
    selectedKey: SearchableKey | undefined
) =>
    useMemo(() => {
        if (!selectedKey || searchTypesMap[selectedKey] !== "enum") {
            return []
        }

        return data
            .map((row) => row[selectedKey])
            .filter((v, i, a) => a.indexOf(v) === i)
    }, [data, selectedKey])

export default useExtractEnumData
