import { ComponentMeta, ComponentStory } from "@storybook/react"
import * as React from "react"
import day from "dayjs"
import randomWords from "random-words"

import Autocomplete from "./Autocomplete"

export default {
    title: "Components/Autocomplete",
    component: Autocomplete,
} as ComponentMeta<typeof Autocomplete>

const Template: ComponentStory<typeof Autocomplete> = (args) => (
    <Autocomplete {...args} />
)

export const Default = Template.bind({})
Default.args = {
    searchKeys: ["name", "status", "positionApplied"],
    loading: false,
    data: [...new Array(10)].fill(0).map(() => ({
        name: randomWords({ min: 1, max: 3, join: " " }),
        email: `${randomWords({ exactly: 2, join: "." })}@gmail.com`,
        age: 25,
        positionApplied: "Front-End Engineer",
        status: "waiting",
        dateApplied: day().toDate(),
        yearsOfExperience: 20,
    })),
}
