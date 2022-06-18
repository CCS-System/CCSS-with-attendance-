import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import PaginatedTable from "../../../../components/PaginatedTable";
import { StatefulCalendar } from 'baseui/datepicker';
import Content from "../../../../components/Content";
import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/schedules";
import attendanceAPI from "../../../../api/attendance";
import studentsAPI from "../../../../api/students"
import { Notification } from 'baseui/notification';
import { Tag } from "baseui/tag";
const notificationOverrides = {
    Body: { style: { width: 'auto', margin: "1rem .5rem" } },
};
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
const Page = ({ id, actions }) => {
    const navigate = useNavigate();
    const organizeByDate = (list) => {
        const lookup = {};
        for (const a of list) {
            const date = a.date;
            if (lookup[date]) {
                const l = lookup[date];
                lookup[date] = [...l, a];
            }
            else {
                lookup[date] = [a];
            }
        }
        setAttendance(lookup);
    }
    const { loading: l1, request: r1, error: e1,data } = useAPI(theAPI.getById, { onComplete: (d) => { getStudents(d.section.id); } });
    const { loading: l2, request: r2, error: e2 } = useAPI(attendanceAPI.allBySchedule, { onComplete: organizeByDate });
    const { loading: l3, request: getStudents, data:students } = useAPI(studentsAPI.allBySection, { errorMessage: "Could not fetch students!",  });
    useEffect(() => {
        r1(id);
        r2(id);
    }, []);



    const [attendance, setAttendance] = useState({});
    const [selectedDate, setSelectedDate] = useState("");
    const loading = l1 || l2 || l3;
    const error = e1 || e2;
    const toRow = (students) => {
        const rows = [];
        if (students && students.length) {
            students.forEach(({ attendance, studentId, fullname, }) => {
                const absentDays = attendance.filter(({ absent, schedule }) => absent && schedule.id === id).length;
                const presentDays = attendance.filter(({ absent, schedule }) => !absent && schedule.id === id).length;
                const percentage = Math.round((presentDays / (absentDays + presentDays)) * 100);
                rows.push([studentId, fullname, absentDays, presentDays, <Tag closeable={false} kind={percentage >= 75 ? "positive" : "negative"}>{isNaN(percentage) ? "0 %" : `${percentage} %`}</Tag>]);
            })
        }
        return rows;
    }

    const toSheetRow = (data) => {
        const rows = [];
        if (data) {
            data.forEach(({ absent, student: { studentId, fullname, } }) => {
                rows.push([studentId, fullname, <Tag closeable={false} kind={!absent ? "positive" : "negative"}>{absent ? "ABSENT" : "PRESENT"}</Tag>]);
            })
        }
        return rows;
    }
    return <Content error={error} isLoading={loading} title={data && `Attendance Details : ${data.name}` || "Attendance Details"} actions={actions}>
        {data && <>
            {Object.keys(attendance).length > 0 ? <FlexGrid
                flexGridColumnCount={2}
                flexGridColumnGap="1px"
                flexGridRowGap="1px"

            >
                <FlexGridItem>

                    <StatefulCalendar
                        includeDates={Object.keys(attendance).length > 0 ? Object.keys(attendance).map((e) => new Date(e)) : undefined}
                        onChange={({ date }) => setSelectedDate(date.toISOString())}
                    />
                </FlexGridItem>
                <FlexGridItem>
                    {selectedDate ? <PaginatedTable error={error} isLoading={loading} title={`Attendance Sheet for ${new Date(selectedDate).toDateString()}`} columns={["Student ID", "Full name", "Status"]} data={toSheetRow(attendance[selectedDate])} /> : <Notification
                        overrides={notificationOverrides}
                    >
                        Please select a date from the calendar to view attendance sheet
                    </Notification>}
                </FlexGridItem>
            </FlexGrid> :
                <Notification

                    overrides={notificationOverrides}
                >
                    No attendance currently avaliable
                </Notification>}


           <PaginatedTable error={error} isLoading={loading} title="Students" columns={["Student ID", "Full name", "Days Absent", "Days Present", "Overall Attendance"]} data={toRow(students)} />
        </>}
    </Content>


}
export default Page;