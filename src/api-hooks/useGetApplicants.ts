import { useQuery } from "@tanstack/react-query"

import { Applicant } from "@/types/Applicant"
import InternalApiResponse from "@/types/InternalApiResponse"
import Filter from "@/types/Filter"
import { searchTypesMap } from "@/components/Autocomplete/util"
import { ApplicantKey } from "@/util/keyParseMap"
import Sort from "@/types/Sort"
import Pagination from "@/types/Pagination"

const fetchApplicants = async (): Promise<InternalApiResponse<Applicant[]>> => {
    const response = await fetch("/api/applicants")
    return await response.json()
}

/**
 * This hook is responsible for the synthetic filtering, sorting and pagination since we don't have an api to do it
 *
 * The order of operations is filter -> sort -> paginate
 *
 * @param filters
 * @returns
 */
const useGetApplicants = (
    filters: Filter[],
    sort: Sort,
    pagination: Pagination
) => {
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

    const sortedApplicants = [...filteredApplicants].sort((a, b) => {
        if (typeof a[sort.key] === "number") {
            return sort.direction === "ASC"
                ? (a[sort.key] as number) - (b[sort.key] as number)
                : (b[sort.key] as number) - (a[sort.key] as number)
        }

        return sort.direction === "ASC"
            ? a[sort.key].toString().localeCompare(b[sort.key].toString())
            : b[sort.key].toString().localeCompare(a[sort.key].toString())
    })

    const paginatedApplicants = sortedApplicants.slice(
        (pagination.pageNumber - 1) * pagination.rowsPerPage,
        pagination.pageNumber * pagination.rowsPerPage
    )

    const totalCount = sortedApplicants.length

    return {
        allApplicants,
        paginatedApplicants: {
            pageNumber: pagination.pageNumber,
            applicants: paginatedApplicants,
            rowsPerPage: pagination.rowsPerPage,
            totalCount,
        },
        isLoading,
        error: data?.error,
    }
}

export default useGetApplicants
