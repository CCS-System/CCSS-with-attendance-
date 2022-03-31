import React, { useEffect } from "react";
import {
    Card,
    StyledBody,
    StyledAction,
    StyledThumbnail,
} from 'baseui/card';
import { Button } from 'baseui/button';
import { useNavigate } from "react-router-dom";
import { slotLookup } from "./ScheduleDisplay";
import { ListItem, ListItemLabel, ListHeading } from 'baseui/list';
import PaginatedTable from "../../../../components/PaginatedTable";
import Content from "../../../../components/Content";
import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/schedules";
import AttendanceDetail from "../../Attendance/components/AttendanceDetail"
export const weekdayLookup = ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
const Page = ({ id, removable, actions }) => {
    const navigate = useNavigate();
    const { loading, request, error, data } = useAPI(theAPI.getById);
    const { loading: deleteLoading, request: deleteRequest } = useAPI(theAPI.delete, { onComplete: () => { navigate(-1); }, errorMessage: "Could not delete!", successMessage: "deleted!" });
    useEffect(() => {
        request(id);
    }, [])
    const time = (s) => {
        if (s) {
            const slot = s.split(",").map((e)=>parseInt(e));
            console.log(slot);
            const startDate = new Date(`2018-11-01T${slotLookup[slot[0]]}`);
            const endDate = new Date(`2018-11-01T${slotLookup[slot[slot.length - 1] + 1]}`);
            return `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;

        }
        return "";
    }
    const toRow = (data) => {
        const rows = [];
        if (data && data.students && data.students.length) {
            const students = data.students;
            students.forEach(({ attendance, studentId, fullname, }) => {
                const absentDays = attendance.filter(({ absent }) => absent).length;
                const presentDays = attendance.filter(({ absent }) => !absent).length;
                const percentage = Math.round((presentDays / (absentDays + presentDays)) * 100);
                rows.push([studentId, fullname, absentDays, presentDays, `${percentage} %`]);
            })
        }
        return rows;
    }
    return <Content error={error} isLoading={loading || deleteLoading} title="Schedule Details">
        {data && <>
            <Card
            >
                <StyledBody>
                    <ListHeading
                        heading={data.name}
                        endEnhancer={() => (

                            <>
                                {removable && <Button size="compact" shape="pill" colors={{ backgroundColor: "indianred", color: "white" }} onClick={() => {
                                    if (confirm("Are you sure, this action is permanent!")) {
                                        deleteRequest(data.id);
                                    }
                                }}>
                                    Delete
                                </Button>}
                            </>

                        )}
                        maxLines={1}
                    />
                    <ListItem>
                        <ListItemLabel description="Class">{data.name}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Schedule">{`${weekdayLookup[data.weekday]} ${time(data.slots)}`}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Classroom">{data.classroom.name}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Teacher">{data.teacher.user.fullname}</ListItemLabel>
                    </ListItem>
                    <ListItem>
                        <ListItemLabel description="Section">{`${data.section.department.id} ${data.section.name} [${data.section.year} batch]`}</ListItemLabel>
                    </ListItem>
                </StyledBody>
                <StyledAction>
                </StyledAction>
            </Card>

            <AttendanceDetail id={id} actions={actions} />
        </>}
    </Content>


}
export default Page;