import { ComponentMeta, ComponentStory } from "@storybook/react"
import * as React from "react"

import Table from "./Table"

export default {
    title: "Components/Table",
    component: Table,
} as ComponentMeta<typeof Table>

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

export const Default = Template.bind({})
Default.args = {}
