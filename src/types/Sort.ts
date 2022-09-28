import { ApplicantKey } from "@/util/keyParseMap"

interface Sort {
    direction: "ASC" | "DSC"
    key: ApplicantKey
}

export default Sort
