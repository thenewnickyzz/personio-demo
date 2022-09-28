import { useQuery } from "@tanstack/react-query"

import { Applicant } from "@/types/Applicant"
import InternalApiResponse from "@/types/InternalApiResponse"
import Filter from "@/types/Filter"
import { searchTypesMap } from "@/components/Autocomplete/util"
import { ApplicantKey } from "@/util/keyParseMap"

const fetchApplicants = async (): Promise<InternalApiResponse<Applicant[]>> => {
    const response = await fetch("/api/applicants")
    return await response.json()
}

/**
 * This hook is responsible for the synthetic filtering since we don't have an api to do it
 *
 * @param filters
 * @returns
 */
const useGetApplicants = (filters: Filter[]) => {
    const { isLoading, data } = useQuery(["candidates"], fetchApplicants, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    const allApplicants = data?.data || []

    // TODO: might want to change to an && instead of an || between different keys
    const filteredApplicants = filters.length
        ? allApplicants.filter((applicant) =>
              filters.some(({ key, value }) => {
                  if (searchTypesMap[key as ApplicantKey] === "enum") {
                      return applicant[key as ApplicantKey] === value
                  }
                  return applicant[key as ApplicantKey]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase().trim())
              })
          )
        : allApplicants

    return { allApplicants, filteredApplicants, isLoading, error: data?.error }
}

export default useGetApplicants
