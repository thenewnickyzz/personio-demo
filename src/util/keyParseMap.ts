import { Applicant } from "@/types/Applicant"

export type ApplicantKey = keyof Applicant

type KeyParseMap = {
    [key in ApplicantKey]: string
}

// Helper to parse the Applicant key to readable labels
const keyParseMap: KeyParseMap = {
    name: "Name",
    age: "Age",
    dateApplied: "Applied At",
    email: "Email",
    status: "Status",
    positionApplied: "Position",
    yearsOfExperience: "Experience (yrs)",
}

export default keyParseMap
