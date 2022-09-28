import { ComponentMeta, ComponentStory } from "@storybook/react"
import day from "dayjs"
import randomWords from "random-words"
import * as React from "react"

import EmptyState from "./EmptyState"

export default {
    title: "Components/EmptyState",
    component: EmptyState,
} as ComponentMeta<typeof EmptyState>

const Template: ComponentStory<typeof EmptyState> = (args) => (
    <EmptyState {...args} />
)

export const Default = Template.bind({})
Default.args = {
    children: `No matching applicants were found`,
}
