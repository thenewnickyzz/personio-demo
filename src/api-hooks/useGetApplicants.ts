import { useQuery } from "@tanstack/react-query"

import { Applicant } from "@/types/Applicant"
import InternalApiResponse from "@/types/InternalApiResponse"

const fetchApplicants = async (): Promise<InternalApiResponse<Applicant[]>> => {
    const response = await fetch("/api/applicants")
    return await response.json()
}

const useGetApplicants = () => {
    const { error, isLoading, data } = useQuery(
        ["candidates"],
        fetchApplicants,
        { refetchOnWindowFocus: false, refetchOnReconnect: false }
    )

    return { data, isLoading, error }
}

export default useGetApplicants
