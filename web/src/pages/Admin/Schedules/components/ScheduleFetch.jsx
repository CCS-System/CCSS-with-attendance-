import React, { useState, useEffect } from "react";
import Content from "../../../../components/Content";
import ScheduleDisplay from "./ScheduleDisplay";
import useAPI from "../../../../hooks/useAPI";
import theAPI from "../../../../api/schedules";
import { FormControl } from "baseui/form-control";
import { useNavigate } from "react-router-dom";

import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Select } from "baseui/select";
import { Notification } from 'baseui/notification';
import CreateReserved from "./CreateReserved";

const notificationOverrides = {
    Body: { style: { width: 'auto', margin: "1rem .5rem" } },
};

const ordinalSuffix = (i) => {
    const j = i % 10;
    const k = i % 100;
    if (j == 1 && k !== 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

const Page = ({ by, id, removable, addable, makeup, reserved, actions, info, title: t, teacher: initialTeacher }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const view = by.toLowerCase();
    let func = theAPI.allBySection;
    switch (view) {
        case "teacher":
            func = theAPI.allByTeacher;
            break;
        case "section":
            func = theAPI.allBySection;
            break;
        case "classroom":
            func = theAPI.allByClassroom;
            break;
    }

    const title = (schedule) => {
        switch (view) {
            case "teacher":
                return `${schedule.teacher.user.fullname}`;
            case "section":
                return `${ordinalSuffix(schedule.section.year)} year ${schedule.section.department.id} ${schedule.section.name} Students`;
            case "classroom":
                return `${schedule.classroom.name} [${schedule.classroom.type}]`;
        }
        return "-"
    }
    const { request, loading, error } = useAPI(func, { onComplete: (e) => { setAllSchedules(e.map((s) => ({ ...s, slots: s.slots.split(",").map((v) => parseInt(v)) }))); } });
    const { loading: deleteLoading, request: deleteRequest } = useAPI(theAPI.delete, { onComplete: () => { setSchedules([]); setAllSchedules([]); setFilters({}); request(id); }, errorMessage: "Could not delete!", successMessage: "deleted!" });
    const { loading: addLoading, request: addRequest } = useAPI(theAPI.create, { onComplete: () => { setSchedules([]); setAllSchedules([]); setFilters({}); request(id); }, errorMessage: "Could not add!", successMessage: "added!" });
    const { loading: reservedLoading, request: reservedRequest } = useAPI(theAPI.createReserved, { onComplete: () => { setIsOpen(false); setSchedules([]); setAllSchedules([]); setFilters({}); request(id); }, errorMessage: "Could not add!", successMessage: "added!" });
    useEffect(() => { request(id); }, [])

    const [allSchedules, setAllSchedules] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [filters, setFilters] = useState({});
    const filterByYearAndSemester = (year, semester) => {
        return allSchedules.filter(({ year: y, semester: s }) => (y === year && semester === s));
    }
    const filterSchedules = () => {
        if (filters.year && filters.year.length > 0 && filters.semester && filters.semester.length > 0) {

            setSchedules(filterByYearAndSemester(filters.year[0].id, filters.semester[0].id))
        }
    }
    useEffect(() => {
        filterSchedules();
    }, [filters]);
    return <Content title={t || "Schedule"} isLoading={loading || deleteLoading} error={error} actions={reserved ? [{ name: "Add Reserved Time", handler: () => { setIsOpen(true) } }] : undefined}>
        <CreateReserved year={filters.year} semester={filters.semester} teacher={initialTeacher} isOpen={isOpen} setIsOpen={setIsOpen} isLoading={reservedLoading} onSubmit={(e) => { if (reservedRequest) reservedRequest(e) }} />
        <FlexGrid
            flexGridColumnCount={2}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
            justifyItems="space-between"
        >
            <FlexGridItem>
                <FormControl label="Academic Year" >
                    <Select
                        options={Object.entries(Object.fromEntries(allSchedules.map((schedule) => [schedule.year, true]))).map(([key]) => ({ id: key, label: key }))}
                        onChange={({ value: year }) => { setFilters({ ...filters, year }) }}
                        value={filters.year}
                    />
                </FormControl>
            </FlexGridItem>

            <FlexGridItem>
                <FormControl label="Academic Semester" >
                    <Select
                        options={Object.entries(Object.fromEntries(allSchedules.map((schedule) => [schedule.semester, true]))).map(([key]) => ({ id: key, label: key }))}
                        onChange={({ value: semester }) => { setFilters({ ...filters, semester }) }}
                        value={filters.semester}
                    />
                </FormControl>
            </FlexGridItem>
        </FlexGrid>
        {info && schedules.length > 0 && <Notification
            overrides={notificationOverrides}
        >
            {info}
        </Notification>}
        {schedules.length > 0 ? <>
            <ScheduleDisplay by={by} department={[{ id: schedules[0].section.department.id, label: schedules[0].section.department.name }]} section={[{ id: schedules[0].section.id, label: schedules[0].section.name }]} teacher={[{ id: schedules[0].teacher.id, label: schedules[0].teacher.user.fullname }]} year={schedules[0].year} semester={schedules[0].semester} title={`${schedules[0].year} AY, Semester  ${schedules[0].semester} - Schedule for ${title(schedules[0])}`} schedules={schedules} deleteRequest={removable && deleteRequest} addRequest={addable && addRequest} makeupRequest={makeup && addRequest} actions={actions} isLoading={addLoading} /></> : <Notification
                overrides={notificationOverrides}
            >
            No schedule avaliable for the selected time period (make sure to select a year and semester)
        </Notification>}
    </Content>


}
export default Page;