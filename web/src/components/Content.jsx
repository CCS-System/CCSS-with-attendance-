import React from "react";
import Header from "./Header";
import Container from "./Container";
import { Skeleton } from 'baseui/skeleton';
import { Notification } from 'baseui/notification';
const Loading = () => {
    return <>
        <Skeleton
            animation
            rows={2}
            width="100%"
            overrides={{
                Row: {
                    style: {
                        height: '20px',
                        marginBottom: '15px',
                    },
                },
            }}
        />
        <Skeleton width="100%" height="70vh" animation /></>
}
export default function Content({ title, actions, children, isLoading, error, }) {
    const notificationOverrides = {
        Body: { style: { width: 'auto', margin: "1rem .5rem" } },
    };
    return <> {isLoading && <Loading />}
        {error && <Notification
            kind="negative"
            overrides={notificationOverrides}
        >
            Something went wrong: {error}
        </Notification>}
        {!isLoading && !error && <>
            <Header title={title} actions={actions} />
            <Container>
                {children}
            </Container></>}</>
}