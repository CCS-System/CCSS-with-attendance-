import React from "react";

import { Tag } from "baseui/tag";

import { ListItem, ListItemLabel, ListHeading } from 'baseui/list';

const Page = ({ course, type, duration, teachers }) => {


    return <>
        <ListHeading
            heading={`${course} [${type}]`}
            subHeading={`${duration} hours`}
            maxLines={1}
        />
        <ListItem>
            <ListItemLabel description="Allowed Teachers">
                {teachers.map(({ id, label }) => {
                    return <Tag
                        kind="primary"
                        key={id}
                        closeable={false}
                    >
                        {label}
                    </Tag>
                })}
            </ListItemLabel>
        </ListItem>
    </>


}
export default Page;