import React, { useState } from "react";
import Content from "../../../components/Content";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleGenerator from "./components/ScheduleGenerator";
import ScheduleDisplay from "./components/ScheduleDisplay";
import { generateSchedule } from "./components/scheduler";
import useAPI from "../../../hooks/useAPI";
import schedulesAPI from "../../../api/schedules"

const Page = () => {
    const navigate = useNavigate();
    const { request, loading } = useAPI(schedulesAPI.bulk, { errorMessage: "Could save!", successMessage: "Saved!", onComplete: () => { navigate(-1) } });
    const [schedules, setSchedules] = useState([])
    const [isLoading1, setIsLoading] = useState(false);
    const isLoading = isLoading1 || loading;
    const group = () => {
        const sec = {};
        schedules.forEach((s) => {
            const list = sec[s.label];
            if (list) {
                sec[s.label] = [...list, s];

            }
            else {
                sec[s.label] = [s];
            }
        });
        return sec;
    }
    const generate = async (e) => {
        setIsLoading(true)
        try {
            const s = await generateSchedule(e.classes, e.sections);
            setSchedules(s)
        }
        catch (e) {
            alert(e);
        }
        setIsLoading(false)


    }
    return <Content isLoading={isLoading} title={`${schedules.length ? "Schedule Generated!" : "Generate Schedule"}`} actions={schedules.length ? [{ name: "Save Schedules", handler: () => { request({ schedules }) } }] : undefined}>
        {!schedules.length > 0 && <ScheduleGenerator onSubmit={generate} isLoading={isLoading} />}
        {schedules.length > 0 && <> {Object.keys(group()).map((section) => {
            return <ScheduleDisplay title={section} schedules={group()[section]} />
        })}
        </>}
    </Content>


}
export default Page;