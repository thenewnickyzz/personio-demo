export interface Applicant {
    name: string
    email: string
    age: number
    yearsOfExperience: number
    positionApplied: string
    dateApplied: Date
    status: "approved" | "rejected" | "waiting"
}
