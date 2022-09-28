import { Autocomplete } from "@/components/Autocomplete"
import { Table } from "@/components/Table"

import useGetApplicants from "@/api-hooks/useGetApplicants"

export default function HomePage() {
    const { data, isLoading } = useGetApplicants()

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
            <Table
                className="mt-20"
                loading={isLoading}
                rows={data?.data || []}
                sortBy={["name", "positionApplied"]}
            />
        </div>
    )
}
