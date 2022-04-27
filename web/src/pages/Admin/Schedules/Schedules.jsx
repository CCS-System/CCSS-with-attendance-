import React, { useState, useEffect } from "react";
import Content from "../../../components/Content";
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import SectionListCard from "./components/SectionListCard";
import useAPI from "../../../hooks/useAPI";
import theAPI from "../../../api/schedules";
import { Notification } from 'baseui/notification';
import Create from "./components/Create";

const itemProps = {
    display: 'flex',
};

const notificationOverrides = {
    Body: { style: { width: 'auto', margin: "1rem .5rem" } },
};


const Page = () => {
    const [sections, setSections] = useState([])
    const mapByDepartment = (e) => {
        const sections = e.map((p) => ({ ...p, department: p.section.department.name, id: p.section.id, label: `${p.section.name} [${p.section.year} batch]` }));
        const uniqueSections = {}
        for (const section of sections) {
            uniqueSections[section.id] = section;
        }
        const sectionByDepartment = {};
        for (const s of Object.values(uniqueSections)) {
            if (sectionByDepartment[s.department]) {
                sectionByDepartment[s.department].push(s);
            }
            else {
                sectionByDepartment[s.department] = [s];
            }
        }


        return Object.entries(sectionByDepartment).map(([department, sections]) => ({ department, sections }));
    }
    const { request, loading, error } = useAPI(theAPI.all, { onComplete: (e) => { setSections(mapByDepartment(e)) } });
    const { loading: addLoading, request: addRequest } = useAPI(theAPI.create, { onComplete: () => { setIsOpen(false); request(); }, errorMessage: "Could not add!", successMessage: "added!" });
    useEffect(() => { request(); }, [])
    const [isOpen, setIsOpen] = useState(false);
    return <Content error={error} isLoading={loading} title="Schedules" actions={[{ name: "Generate Schedule", link: "/app/admin/generate-schedule" }, { name: "Schedule a Class", handler: () => { setIsOpen(true) } }]}>
        <Create isOpen={isOpen} setIsOpen={setIsOpen} isLoading={addLoading} onSubmit={(e) => { if (addRequest) addRequest(e) }} />
        <FlexGrid
            flexGridColumnCount={[1, 1, 2, 2]}
            flexGridColumnGap="1px"
            flexGridRowGap="1px"
        >
            {sections && sections.length < 1 && <Notification
                overrides={notificationOverrides}
            >
                No schedules avaliable
            </Notification>}
            {sections.map(({ department, sections }) => (<FlexGridItem key={department} {...itemProps} ><SectionListCard department={department} sections={sections} /> </FlexGridItem>))}
        </FlexGrid>
    </Content>


}
export default Page;