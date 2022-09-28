import { Applicant } from "@/types/Applicant"

export type SearchableKey = keyof Applicant

type SearchTypes = "string" | "enum"

// Defines whether the searched field should have a selectable list or not. Might need to expand to also support numbers and dates
export const searchTypesMap: { [key in SearchableKey]: SearchTypes } = {
    name: "string",
    positionApplied: "string",
    status: "enum",
    age: "string",
    dateApplied: "string",
    email: "string",
    yearsOfExperience: "string",
}
