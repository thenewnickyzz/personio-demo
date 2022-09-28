import { useEffect, useState } from "react"

import { Autocomplete } from "@/components/Autocomplete"
import { Table } from "@/components/Table"
import { ErrorState } from "@/components/ErrorState"
import useGetApplicants from "@/api-hooks/useGetApplicants"
import Filter from "@/types/Filter"
import { Tag } from "@/components/Tag"
import { useRouter } from "next/router"

interface HomePageProps {
    filters: Filter[]
}

export default function HomePage(props: HomePageProps) {
    const router = useRouter()

    const [filters, setFilters] = useState<Filter[]>(props.filters)

    const { allApplicants, filteredApplicants, isLoading, error } =
        useGetApplicants(filters)

    const onSubmit = (filter: Filter) => {
        const newFilters = [...filters, filter]
        setFilters(newFilters)
        router.query.filters = JSON.stringify(newFilters)
        router.push(router)
    }

    const removeFilter = (filter: Filter) => {
        const newFilters = filters.filter(
            ({ key, value }) => !(key === filter.key && value === filter.value)
        )
        setFilters(newFilters)
        router.query.filters = JSON.stringify(newFilters)
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
                />
            )}
        </div>
    )
}

HomePage.getInitialProps = async ({ query }: any) => {
    if (!query.filters) {
        return { filters: [] }
    }
    return { filters: JSON.parse(query.filters) }
}
