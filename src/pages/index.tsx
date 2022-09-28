import { useState } from "react"

import { Autocomplete } from "@/components/Autocomplete"
import { Table } from "@/components/Table"
import { ErrorState } from "@/components/ErrorState"
import useGetApplicants from "@/api-hooks/useGetApplicants"
import Filter from "@/types/Filter"
import { Tag } from "@/components/Tag"
import { useRouter } from "next/router"
import Sort from "@/types/Sort"
import PaginationType from "@/types/Pagination"
import { ApplicantKey } from "@/util/keyParseMap"
import { Pagination } from "@/components/Pagination"

interface HomePageProps {
    filters: Filter[]
    sort: Sort
    pagination: PaginationType
}

export default function HomePage(props: HomePageProps) {
    const router = useRouter()

    const [filters, setFilters] = useState<Filter[]>(props.filters)
    const [sort, setSort] = useState<Sort>(props.sort)
    const [pagination, setPagination] = useState<PaginationType>(
        props.pagination
    )

    const { allApplicants, paginatedApplicants, isLoading, error } =
        useGetApplicants(filters, sort, pagination)

    const saveToQuery = (key: string, value: any) => {
        router.query[key] = JSON.stringify(value)
        router.push(router)
    }

    const resetPagination = () => {
        const newPagination = {
            ...pagination,
            pageNumber: 1,
        }
        setPagination(newPagination)
        saveToQuery("pagination", newPagination)
    }

    // Add new filter, reset pagination and update the query string
    const onSubmit = (filter: Filter) => {
        const newFilters = [...filters, filter]

        setFilters(newFilters)
        saveToQuery("filters", newFilters)
        resetPagination()
    }

    // Remove filter, reset pagination and update the query string
    const removeFilter = (filter: Filter) => {
        const newFilters = filters.filter(
            ({ key, value }) => !(key === filter.key && value === filter.value)
        )

        setFilters(newFilters)
        saveToQuery("filters", newFilters)
        resetPagination()
    }

    // Change sort and update the query string
    const onSortClick = (key: ApplicantKey) => {
        const newSort: Sort = {
            key,
            direction:
                key !== sort.key
                    ? "DSC"
                    : sort.direction === "ASC"
                    ? "DSC"
                    : "ASC",
        }
        setSort(newSort)
        saveToQuery("sort", newSort)
        resetPagination()
    }

    // Change pagination and update the query string
    const onNextPage = () => {
        const newPagination = {
            ...pagination,
            pageNumber: pagination.pageNumber + 1,
        }
        setPagination(newPagination)
        saveToQuery("pagination", newPagination)
    }

    // Change pagination and update the query string
    const onPreviousPage = () => {
        const newPagination = {
            ...pagination,
            pageNumber: pagination.pageNumber - 1,
        }
        setPagination(newPagination)
        saveToQuery("pagination", newPagination)
    }

    return (
        <div className="container pt-24 pb-10">
            <div className="flex items-center">
                <h1 className="text-4xl font-semibold text-text-700">
                    Applicants
                </h1>
                <div className="ml-40 flex-1">
                    <Autocomplete
                        data={allApplicants}
                        loading={isLoading || !!error}
                        onSubmit={onSubmit}
                        searchKeys={["name", "positionApplied", "status"]}
                    />
                </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
                {filters.map(({ key, value }) => (
                    <Tag
                        key={key + value}
                        keyCol={key}
                        value={value}
                        onClick={removeFilter}
                        loading={isLoading || !!error}
                    />
                ))}
            </div>
            {error ? (
                <ErrorState className="mt-10">
                    There was a problem with fetching your data
                    <br />
                    Please try again later
                </ErrorState>
            ) : (
                <>
                    <Table
                        className="mt-10"
                        loading={isLoading}
                        rows={paginatedApplicants.applicants}
                        sortBy={[
                            "name",
                            "positionApplied",
                            "yearsOfExperience",
                        ]}
                        sort={sort}
                        onSortClick={onSortClick}
                    />
                    {!isLoading && !error && (
                        <Pagination
                            page={paginatedApplicants.pageNumber}
                            onNext={onNextPage}
                            onPrevious={onPreviousPage}
                            totalCount={paginatedApplicants.totalCount}
                            rowsPerPage={paginatedApplicants.rowsPerPage}
                        />
                    )}
                </>
            )}
        </div>
    )
}

HomePage.getInitialProps = async ({ query }: any) => {
    let filters = []
    let sort = {
        key: query.sort?.key || "name",
        direction: query.sort?.direction || "ASC",
    }
    let pagination = {
        rowsPerPage: 15,
        pageNumber: 1,
    }

    if (query.sort) {
        sort = JSON.parse(query.sort)
    }

    // TODO: might need to check if the keys are valid
    if (query.filters) {
        filters = JSON.parse(query.filters)
    }

    if (query.pagination) {
        pagination = JSON.parse(query.pagination)
    }

    return { filters, sort, pagination }
}
