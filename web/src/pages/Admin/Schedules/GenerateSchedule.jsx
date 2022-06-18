import React, { useState } from "react";
import Content from "../../../components/Content";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleGenerator from "./components/ScheduleGenerator";
import ScheduleDisplay from "./components/ScheduleDisplay";
import useAPI from "../../../hooks/useAPI";
import schedulesAPI from "../../../api/schedules"
import { Tabs, Tab } from "baseui/tabs-motion";
import test from "./components/test_data";


const Page = () => {
    const navigate = useNavigate();
    const { request, loading } = useAPI(schedulesAPI.bulk, { errorMessage: "Could not save!", successMessage: "Saved!", onComplete: () => { navigate(-1) } });
    const { request: generate, loading: isLoading1 } = useAPI(schedulesAPI.generate, { errorMessage: "Could not generate schedule!", successMessage: "Schedule generated!", onComplete: (s) => { setSchedules(s); } });

    const [schedules, setSchedules] = useState([])
    const groups = [{ key: "sectionLabel", label: "Group by Section" }, { key: 'classroomLabel', label: "Group by Classroom" }, { key: 'teacherLabel', label: "Group By Teacher" }];
    const [activeGroup, setActiveGroup] = React.useState(groups[0].key);
    const isLoading = isLoading1 || loading;
    const groupBy = (field) => {

        const sec = {};
        schedules.forEach((s) => {
            const list = sec[s[field]];
            if (list) {
                sec[s[field]] = [...list, s];

            }
            else {
                sec[s[field]] = [s];
            }
        });
        return sec;
    }
    return <Content isLoading={isLoading} title={`${schedules.length ? "Schedule Generated!" : "Generate Schedule"}`} actions={schedules.length ? [{ name: "Save Schedules", handler: () => { request({ schedules }) } }, { name: "Generate New", handler: () => { setSchedules([]) } }] : undefined}>
        {/* <button onClick={() => { generate(test) }} >Trigger test</button> */}
        {!schedules.length && <ScheduleGenerator onSubmit={generate} isLoading={isLoading} />}
        {schedules.length > 0 && <Tabs
            activeKey={activeGroup}
            onChange={({ activeKey }) => {
                setActiveGroup(activeKey);
            }}
            activateOnFocus
        >
            {groups.map(({ key, label }) => {
                return <Tab key={key} title={label}>

                    {Object.keys(groupBy(key)).map((k) => {
                        return <ScheduleDisplay title={k} schedules={groupBy(key)[k]} />
                    })}
                </Tab>
            })}
        </Tabs>}

    </Content>


}
export default Page;