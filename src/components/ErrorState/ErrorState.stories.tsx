import { ComponentMeta, ComponentStory } from "@storybook/react"
import day from "dayjs"
import randomWords from "random-words"
import * as React from "react"

import ErrorState from "./ErrorState"

export default {
    title: "Components/ErrorState",
    component: ErrorState,
} as ComponentMeta<typeof ErrorState>

const Template: ComponentStory<typeof ErrorState> = (args) => (
    <ErrorState {...args} />
)

export const Default = Template.bind({})
Default.args = {
    children: ` There was a problem with fetching your data.`,
}
