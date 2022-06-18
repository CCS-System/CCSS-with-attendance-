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
import theAPI from "../../../api/teachers";
import Schedule from "../Schedules/components/ScheduleFetch";
const Page = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, request, error, data } = useAPI(theAPI.getById);
    const { loading: deleteLoading, request: deleteRequest } = useAPI(theAPI.delete, { onComplete: () => { navigate(-1); }, errorMessage: "Could not delete!", successMessage: "deleted!" });
    useEffect(() => {
        request(id);
    }, [])
    return <Content error={error} isLoading={loading || deleteLoading} title="Teacher Details">
        {data && <>
            <Card
            >
                <StyledBody>
                    <ListHeading
                        heading={data.user.fullname}
                        endEnhancer={() => (
                            <ButtonGroup>
                                <Button size="compact" shape="pill" onClick={() => { navigate(`/app/admin/update-teacher/${data.id}`) }}>
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
                        <ListItemLabel description="Full name">{data.user.fullname}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Departments">{data.departments.reduce((prev, current) => (prev + " " + current.id), "")}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Email">{data.user.email}</ListItemLabel>
                    </ListItem>
                </StyledBody>
                <StyledAction>
                </StyledAction>
            </Card>

            <Schedule teacher={[{ id: data.id, label: data.user.fullname }]} by="teacher" id={id} removable addable makeup reserved actions={[{ name: "detail", handler: ({ id }) => { navigate(`/app/admin/schedule/${id}`) } }]} />
        </>}
    </Content>


}
export default Page;