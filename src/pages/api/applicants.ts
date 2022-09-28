import dayjs from "dayjs"
import { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"

import { Applicant } from "@/types/Applicant"
import InternalApiResponse from "@/types/InternalApiResponse"

interface ApiApplicant {
    id: number
    name: string
    email: string
    birth_date: string
    year_of_experience: number
    position_applied: string
    application_date: string
    status: "waiting" | "approved" | "rejected"
}

interface ApiResponse {
    data: ApiApplicant[]
}

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    const response: InternalApiResponse<Applicant[]> = {
        data: [],
        error: undefined,
    }

    try {
        const apiResponse = await fetch(
            "http://personio-fe-test.herokuapp.com/api/v1/candidates"
        )
        const rawApplicants = (await apiResponse.json()) as ApiResponse

        const mappedApplicants: Applicant[] = rawApplicants.data.map(
            (applicant) => ({
                dateApplied: dayjs(applicant.application_date).toDate(),
                email: applicant.email,
                name: applicant.name,
                positionApplied: applicant.position_applied,
                status: applicant.status,
                yearsOfExperience: applicant.year_of_experience,
                age: dayjs().diff(dayjs(applicant.birth_date), "years"),
            })
        )

        response.data = mappedApplicants

        res.status(200).json(response)
    } catch (err) {
        response.error = "Could not fetch the candidates"
        res.status(200).json(response)
        return
    }
}
