import { ComponentMeta, ComponentStory } from "@storybook/react"
import day from "dayjs"
import randomWords from "random-words"
import * as React from "react"

import Table from "./Table"

export default {
    title: "Components/Table",
    component: Table,
} as ComponentMeta<typeof Table>

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {
    rows: [...new Array(10)].fill(0).map(() => ({
        name: randomWords({ min: 1, max: 3, join: " " }),
        email: `${randomWords({ exactly: 2, join: "." })}@gmail.com`,
        age: 25,
        positionApplied: "Front-End Engineer",
        status: "waiting",
        dateApplied: day().toDate(),
        yearsOfExperience: 20,
    })),
    loading: false,
    sortBy: ["name", "status", "positionApplied"],
}
