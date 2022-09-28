import { useState } from "react"

import { Autocomplete } from "@/components/Autocomplete"
import { Table } from "@/components/Table"
import { ErrorState } from "@/components/ErrorState"
import useGetApplicants from "@/api-hooks/useGetApplicants"
import Filter from "@/types/Filter"
import { Tag } from "@/components/Tag"
import { useRouter } from "next/router"
import Sort from "@/types/Sort"
import { ApplicantKey } from "@/util/keyParseMap"

interface HomePageProps {
    filters: Filter[]
    sort: Sort
}

export default function HomePage(props: HomePageProps) {
    console.log("🚀 ~ file: index.tsx ~ line 19 ~ HomePage ~ props", props)
    const router = useRouter()

    const [filters, setFilters] = useState<Filter[]>(props.filters)
    const [sort, setSort] = useState<Sort>(props.sort)

    const { allApplicants, filteredApplicants, isLoading, error } =
        useGetApplicants(filters, sort)

    // When we add a new filter we want to also append it to the url query string
    const onSubmit = (filter: Filter) => {
        const newFilters = [...filters, filter]
        setFilters(newFilters)
        router.query.filters = JSON.stringify(newFilters)
        router.push(router)
    }

    // When we remove a filter we want to also remove it from the url query string
    const removeFilter = (filter: Filter) => {
        const newFilters = filters.filter(
            ({ key, value }) => !(key === filter.key && value === filter.value)
        )
        setFilters(newFilters)
        router.query.filters = JSON.stringify(newFilters)
        router.push(router)
    }

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
        router.query.sort = JSON.stringify(newSort)
        router.push(router)
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
                <Table
                    className="mt-10"
                    loading={isLoading}
                    rows={filteredApplicants}
                    sortBy={["name", "positionApplied"]}
                    sort={sort}
                    onSortClick={onSortClick}
                />
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

    if (query.sort) {
        sort = JSON.parse(query.sort)
    }

    // TODO: might need to check if the keys are valid
    if (query.filters) {
        filters = JSON.parse(query.filters)
    }

    return { filters, sort }
}
