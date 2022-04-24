import React, { useEffect } from "react";
import {
    Card,
    StyledBody,
    StyledAction,
    StyledThumbnail,
} from 'baseui/card';
import { Button } from 'baseui/button';
import { useParams, useNavigate } from "react-router-dom";
import { ButtonGroup } from "baseui/button-group";
import { ListItem, ListItemLabel, ListHeading } from 'baseui/list';
import Content from "../../../components/Content";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/courses";
const Page = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, request, error, data } = useAPI(theAPI.getById);
    const { loading: deleteLoading, request: deleteRequest } = useAPI(theAPI.delete, { onComplete: () => { navigate(-1); }, errorMessage: "Could not delete!", successMessage: "deleted!" });
    useEffect(() => {
        request(id);
    }, [])
    return <Content error={error} isLoading={loading || deleteLoading} title="Course Details">
        {data && <>
            <Card
            >
                <StyledBody>
                    <ListHeading
                        heading={data.name}
                        endEnhancer={() => (
                            <ButtonGroup>
                                <Button size="compact" shape="pill" onClick={() => { navigate(`/app/admin/update-course/${data.id}`) }}>
                                    Update
                                </Button>
                                <Button size="compact" shape="pill" colors={{ backgroundColor: "indianred", color: "white" }} onClick={() => {
                                    if (confirm("Are you sure, this action is permanent!")) {
                                        deleteRequest(data.id);
                                    }
                                }}>
                                    Delete
                                </Button>
                            </ButtonGroup>
                        )}
                        maxLines={1}
                    />
                    <ListItem>
                        <ListItemLabel description="Department">{data.department.name}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Course Name">{data.name}</ListItemLabel>
                    </ListItem>
                    {/* <ListItem>
                        <ListItemLabel description="Year">{data.year}</ListItemLabel>
                    </ListItem> */}
                </StyledBody>
                <StyledAction>
                </StyledAction>
            </Card>

        </>}
    </Content>


}
export default Page;