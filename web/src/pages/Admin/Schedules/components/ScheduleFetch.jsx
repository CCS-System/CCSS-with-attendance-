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

const notificationOverrides = {
    Body: { style: { width: 'auto', margin: "1rem .5rem" } },
};

const Page = ({ by, id, removable, addable, actions, info, title: t }) => {
    const navigate = useNavigate();
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
                return `${schedule.teacher.user.fullname} [${schedule.teacher.department.id}]`;;
            case "section":
                return `${schedule.section.department.id} ${schedule.section.name} [${schedule.section.year} batch]`;
            case "classroom":
                return `${schedule.classroom.name} [${schedule.classroom.type}]`;
        }
        return "-"
    }
    const { request, loading, error } = useAPI(func, { onComplete: (e) => { setAllSchedules(e.map((s) => ({ ...s, slots: s.slots.split(",").map((v) => parseInt(v)) }))); } });
    const { loading: deleteLoading, request: deleteRequest } = useAPI(theAPI.delete, { onComplete: () => { setSchedules([]); setAllSchedules([]); setFilters({}); request(id); }, errorMessage: "Could not delete!", successMessage: "deleted!" });
    const { loading: addLoading, request: addRequest } = useAPI(theAPI.create, { onComplete: () => { setSchedules([]); setAllSchedules([]); setFilters({}); request(id); }, errorMessage: "Could not add!", successMessage: "added!" });
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
    return <Content title={t || "Schedule"} isLoading={loading || deleteLoading} error={error}>
        <FlexGrid
            flexGridColumnCount={2}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
            justifyItems="space-between"
        >
            <FlexGridItem>
                <FormControl label="Year" >
                    <Select
                        options={Object.entries(Object.fromEntries(allSchedules.map((schedule) => [schedule.year, true]))).map(([key]) => ({ id: key, label: key }))}
                        onChange={({ value: year }) => { setFilters({ ...filters, year }) }}
                        value={filters.year}
                    />
                </FormControl>
            </FlexGridItem>

            <FlexGridItem>
                <FormControl label="Semester" >
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
        {schedules.length > 0 ? <ScheduleDisplay year={schedules[0].year} semester={schedules[0].semester} title={`${schedules[0].year} Semester  ${schedules[0].semester} Schedule for ${title(schedules[0])}`} schedules={schedules} deleteRequest={removable && deleteRequest} addRequest={addable && addRequest} actions={actions} isLoading={addLoading} /> : <Notification
            overrides={notificationOverrides}
        >
            No schedule avaliable for the selected time period (make sure to select a year and semester)
        </Notification>}
    </Content>


}
export default Page;