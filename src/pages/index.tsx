import { Autocomplete } from "@/components/Autocomplete"
import { Table } from "@/components/Table"

import useGetApplicants from "@/api-hooks/useGetApplicants"
import ErrorState from "@/components/ErrorState/ErrorState"

export default function HomePage() {
    const { data, isLoading } = useGetApplicants()
    console.log("🚀 ~ file: index.tsx ~ line 9 ~ HomePage ~ data", data)

    const onSubmit = (data: { key: string; value: string }) => {
        console.log("🚀 ~ file: index.tsx ~ line 9 ~ onSubmit ~ data", data)
    }

    return (
        <div className="container pt-24 pb-10">
            <div className="flex items-center">
                <h1 className="text-4xl font-semibold text-text-700">
                    Applicants
                </h1>
                <div className="ml-40 flex-1">
                    <Autocomplete
                        data={[]}
                        loading={isLoading}
                        onSubmit={onSubmit}
                        searchKeys={["name", "positionApplied", "status"]}
                    />
                </div>
            </div>
            {data?.error ? (
                <ErrorState className="mt-20">
                    There was a problem with fetching your data.
                    <br />
                    Please try again later
                </ErrorState>
            ) : (
                <Table
                    className="mt-20"
                    loading={isLoading}
                    rows={data?.data || []}
                    sortBy={["name", "positionApplied"]}
                />
            )}
        </div>
    )
}
