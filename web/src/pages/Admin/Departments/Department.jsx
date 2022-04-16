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
import departmentsAPI from "../../../api/departments";
import Teachers from "./components/Teachers";
import Sections from "./components/Sections";
import Classrooms from "./components/Classrooms";
const Page = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, request, error, data } = useAPI(departmentsAPI.getById);
    const { loading: deleteLoading, request: deleteRequest } = useAPI(departmentsAPI.delete, { onComplete: () => { navigate(-1); }, errorMessage: "Could not delete department!", successMessage: "deleted!" });
    useEffect(() => {
        request(id);
    }, [])
    return <Content error={error} isLoading={loading || deleteLoading} title="Department Details">
        {data && <>
            <Card
            >
                <StyledBody>
                    <ListHeading
                        heading={data.name}
                        endEnhancer={() => (
                            <ButtonGroup>
                                <Button size="compact" shape="pill" onClick={() => { navigate(`/app/admin/update-department/${data.id}`) }}>
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
                        <ListItemLabel description="Department ID">{data.id}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Name">{data.name}</ListItemLabel>
                    </ListItem>
                </StyledBody>
                <StyledAction>
                </StyledAction>
            </Card>

            <Teachers id={id} />
            <Sections id={id} />
            <Classrooms id={id} />

        </>}
    </Content>


}
export default Page;