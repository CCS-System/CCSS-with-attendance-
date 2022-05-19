import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../../../components/Content"
import { FormControl } from "baseui/form-control";
import { DatePicker } from 'baseui/datepicker';
import { Tag } from "baseui/tag";
import { Button } from "baseui/button";
import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/schedules"
import attendanceAPI from "../../../../api/attendance";
import { Checkbox } from 'baseui/checkbox';
import { ListHeading } from "baseui/list"
import {
    TableBuilder,
    TableBuilderColumn,
} from 'baseui/table-semantic';

const Page = ({ id }) => {
    const navigate = useNavigate();
    const { loading: l, request, error, } = useAPI(theAPI.getById, { onComplete: ({ students }) => { setData(students.map((e) => ({ ...e, selected: false }))) } });
    const { loading: l1, request: CreateAttendance, } = useAPI(attendanceAPI.create, { successMessage: "Completed!", errorMessage: "Could not take attendance!", onComplete: () => { navigate(-1) } });
    useEffect(() => {
        request(id);
    }, [])
    const loading = l1 || l;
    const handleSubmit = () => {
        const payload = { schedule: id, date, students: data.map(({ id, selected }) => ({ id, absent: !selected })) }
        CreateAttendance(payload);
    }
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const hasAny = Boolean(data.length);
    const hasAll = hasAny && data.every(x => x.selected);
    const hasSome = hasAny && data.some(x => x.selected);
    function toggleAll(event) {
        setData(data =>
            data.map(row => ({
                ...row,
                selected: !hasAll,
            })),
        );
    }
    function toggle(event) {
        const { name, checked } = event.currentTarget;
        setData(data =>
            data.map(row => ({
                ...row,
                selected: String(row.fullname) === name ? checked : row.selected,
            })),
        );
    }
    return <Content title="Attendance Sheet" isLoading={loading} error={error} >
        <FormControl label="Date">
            <DatePicker

                onChange={({ date }) => setDate(date)}
            />
        </FormControl>
        <ListHeading
            heading="Students"
            maxLines={1}
            subHeading={` ${data.filter(({ selected }) => !selected).length} Absent , ${data.filter(({ selected }) => selected).length} Present`}
        />

        <TableBuilder data={data}>
            <TableBuilderColumn
                overrides={{
                    TableHeadCell: { style: { width: '1%' } },
                    TableBodyCell: { style: { width: '1%' } },
                }}
                header={
                    <Checkbox
                        checked={hasAll}
                        isIndeterminate={!hasAll && hasSome}
                        onChange={toggleAll}
                    />
                }
            >
                {row => (
                    <Checkbox
                        name={row.fullname}
                        checked={row.selected}
                        onChange={toggle}
                    />
                )}
            </TableBuilderColumn>
            <TableBuilderColumn header="Student Name">
                {row => <>{row.fullname}</>}
            </TableBuilderColumn>
            <TableBuilderColumn header="Current Attendance Status">
                {row => {
                    const attendance = row.attendance; const absentDays = attendance.filter(({ absent }) => absent).length;
                    const presentDays = attendance.filter(({ absent }) => !absent).length;
                    const percentage = Math.round((presentDays / (absentDays + presentDays)) * 100);
                    return <Tag closeable={false} kind={percentage >= 75 ? "positive" : "negative"}>{percentage} %</Tag>
                }}
            </TableBuilderColumn>
            <TableBuilderColumn header="ID">
                {row => row.studentId}
            </TableBuilderColumn>
        </TableBuilder>
        <Button
            type="button"
            id="save"
            disabled={!date}
            onClick={() => {
                handleSubmit();
            }}
        >
            Submit Attendance
        </Button>
    </Content >
}
export default Page;