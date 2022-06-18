import React, { useState } from "react";
// import 'react-calendar-heatmap/dist/styles.css';
// import "./style.css"
import CalendarHeatmap from 'react-calendar-heatmap';
import Content from "./Content";
import PaginatedTable from "./PaginatedTable";
const Page = ({ data }) => {
    const [detailMode, setDetailMode] = useState(false);

    const toAttendanceRow = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ absent, date }) => {
                rows.push([new Date(date).toDateString(), absent ? "Absent" : "Present"]);
            })
        }
        return rows;
    }

    const toAttendanceHeatmap = (data) => {
        const rows = [];
        if (data && data.length) {
            data.forEach(({ absent, date }) => {
                rows.push({ date: new Date(date).toISOString().split('T')[0], count: absent ? 0 : 1 });
            })
        }
        return rows;
    }

    return <Content title="Attendance" actions={[{ name: detailMode ? "Calendar" : "Detail", kind: "secondary", handler: () => { setDetailMode(!detailMode) } }]}>
        {!detailMode && <CalendarHeatmap
            endDate={new Date('2022-12-01')}
            showMonthLabels
            showWeekdayLabels
            showOutOfRangeDays
            horizontal
            values={toAttendanceHeatmap(data)}
            classForValue={(value) => {
                if (!value) {
                    return 'color-empty';
                }
                return `color-scale-${value.count}`;
            }}
        />}
        {detailMode && <PaginatedTable height="300px" title="Attendance Details" columns={["Date", "Absent"]} data={toAttendanceRow(data)} />}
    </Content>


}
export default Page;