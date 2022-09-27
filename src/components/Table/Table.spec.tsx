import { render, screen } from "@testing-library/react"
import day from "dayjs"
import Table, { TableProps } from "./Table"

const props: TableProps = {
    rows: [
        {
            age: 26,
            dateApplied: day("12/12/2022").toDate(),
            email: "jhon.doe@gmail.com",
            name: "john doe",
            positionApplied: "full-stack Engineer",
            status: "approved",
            yearsOfExperience: 10,
        },
        {
            age: 24,
            dateApplied: day("10/10/2022").toDate(),
            email: "molly.polly@gmail.com",
            name: "molly polly",
            positionApplied: "Full-stack Engineer",
            status: "rejected",
            yearsOfExperience: 10,
        },
    ],
    loading: false,
    sortBy: ["name"],
}

describe("<Table />", () => {
    it("Name, position, status should be capital case", () => {
        render(<Table {...props} />)
        const name = screen.getByText("john doe")
        const position = screen.getByText("full-stack Engineer")
        const status = screen.getByText("approved")

        expect(name.className).toContain("capitalize")
        expect(position.className).toContain("capitalize")
        expect(status.className).toContain("capitalize")
    })

    it("Should not display data while loading", () => {
        render(<Table {...props} loading={true} />)
        expect(screen.queryByText("john doe")).toBeNull()
    })
})
