import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    Card,
    StyledBody,
} from 'baseui/card';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

import Grid from '@mui/material/Grid';
import Calendar from "@mui/icons-material/CalendarViewMonth";
import Room from '@mui/icons-material/Room';
import Person from '@mui/icons-material/Person';
import Group from '@mui/icons-material/Group';
import { styled } from '@mui/material/styles'
import { Button } from 'baseui/button';
import { ListItem, ListItemLabel, ListHeading } from 'baseui/list';
import Create from "./Create";
import CreateMakeup from "./CreateMakeup";
import CreateMakeupTeacher from "./CreateMakeupTeacher";


export const slotLookup = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"]
export const weekdayLookup = ["MO", "TU", "WE", "TH", "FR", "SA"];
const PREFIX = 'Demo';
const classes = {
    icon: `${PREFIX}-icon`,
    textCenter: `${PREFIX}-textCenter`,
    firstRoom: `${PREFIX}-firstRoom`,
    secondRoom: `${PREFIX}-secondRoom`,
    thirdRoom: `${PREFIX}-thirdRoom`,
    header: `${PREFIX}-header`,
    commandButton: `${PREFIX}-commandButton`,
};


const Appointment = ({
    children, style, ...restProps
}) => {
    const dataStyles = restProps.data.style || {};
    return <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            ...dataStyles
        }}
    >
        {children}
    </Appointments.Appointment>
};

export default ({ by, department, teacher, section, schedules: s, title, year, semester, deleteRequest, addRequest, makeupRequest, isLoading, actions }) => {
    const schedules = s || [];
    const mappedSchedule = schedules.filter(({ date }) => { if (date) { const d = new Date(); d.setHours(0, 0, 0, 0); return new Date(date) >= d } else { return true; } }).map(({ name, weekday, slots, ...rest }) => {
        return { ...rest, style: { backgroundColor: rest.makeup ? "pink" : rest.reserved ? "lightgray" : name.toLowerCase().includes("[lab]") ? "coral" : "dogerblue" }, startDate: `2018-11-01T${slotLookup[slots[0]]}`, endDate: `2018-11-01T${slotLookup[slots[slots.length - 1] + 1]}`, title: name, rRule: `FREQ=WEEKLY;WKST=SU;BYDAY=${weekdayLookup[weekday]}`, }
    });
    const schedulerData = [
        ...mappedSchedule,
        { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:00', title: 'Lunch Break', rRule: 'FREQ=DAILY', style: { backgroundColor: "lightgray" } },
    ];

    const StyledGrid = styled(Grid)(() => ({
        [`&.${classes.textCenter}`]: {
            textAlign: 'center',
        },
    }));

    const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
        [`&.${classes.icon}`]: {
            color: palette.action.active,
        },
    }));

    const StyledPerson = styled(Person)(({ theme: { palette } }) => ({
        [`&.${classes.icon}`]: {
            color: palette.action.active,
        },
    }));

    const StyledCalendar = styled(Calendar)(({ theme: { palette } }) => ({
        [`&.${classes.icon}`]: {
            color: palette.action.active,
        },
    }));

    const StyledGroup = styled(Group)(({ theme: { palette } }) => ({
        [`&.${classes.icon}`]: {
            color: palette.action.active,
        },
    }));

    const Content = (({
        children, appointmentData, ...restProps
    }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            {appointmentData.makeup && appointmentData.date && <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledCalendar className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                    <span>{`Scheduled for: ${new Date(appointmentData.date).toDateString()}`}</span>
                </Grid>
            </Grid>}

            {appointmentData.classroom && !appointmentData.reserved && typeof appointmentData.classroom === "object" && <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledRoom className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                    <span>{appointmentData?.classroom?.name || "-"}</span>
                </Grid>
            </Grid>}

            {appointmentData.classroomName && !appointmentData.reserved && <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledRoom className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                    <span>{appointmentData.classroomName || "-"}</span>
                </Grid>
            </Grid>}

            {appointmentData.teacher && typeof appointmentData.teacher === "object" && <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledPerson className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                    <span>{appointmentData?.teacher?.user?.fullname || "-"}</span>
                </Grid>
            </Grid>}

            {appointmentData.teacherName  && <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledPerson className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                    <span>{appointmentData.teacherName|| "-"}</span>
                </Grid>
            </Grid>}

            {appointmentData.section && !appointmentData.reserved && typeof appointmentData.section === "object" && <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledGroup className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                    <span>{`${appointmentData.section.department.id} ${appointmentData.section.name} [${appointmentData.section.year} batch]`}</span>
                </Grid>
            </Grid>}


            {appointmentData.sectionName && !appointmentData.reserved  && <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                    <StyledGroup className={classes.icon} />
                </StyledGrid>
                <Grid item xs={10}>
                    <span>{appointmentData.sectionName}</span>
                </Grid>
            </Grid>}

            <Grid container alignItems="center">
                {deleteRequest && appointmentData.id && appointmentData.title !== "Lunch Break" && <StyledGrid item xs={2} className={classes.textCenter}>

                    <Button size="compact" shape="pill" colors={{ backgroundColor: "indianred", color: "white" }} onClick={() => {
                        if (confirm("Are you sure, this action is permanent!")) {
                            deleteRequest(appointmentData.id);
                        }
                    }}>
                        Remove
                    </Button>

                </StyledGrid>}
                {actions && actions.length > 0 && appointmentData.id && !appointmentData.reserved && <StyledGrid item xs={4} className={classes.textCenter}>

                    {actions.map(({ name, handler, colors }) => (<Button key={name} size="compact" shape="pill" colors={colors || { backgroundColor: "dodgerblue", color: "white" }} overrides={{
                        BaseButton: {
                            style: ({ $theme }) => ({
                                marginLeft: $theme.sizing.scale200,
                                marginRight: $theme.sizing.scale200,

                            }),
                        },
                    }} onClick={() => { handler(appointmentData) }}>
                        {name}
                    </Button>))}

                </StyledGrid>}

            </Grid>

        </AppointmentTooltip.Content>
    ));

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMakeup, setIsOpenMakeup] = useState(false);
    const [isOpenMakeupTeacher, setIsOpenMakeupTeacher] = useState(false);

    return <>
        <Create year={year} semester={semester} isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} onSubmit={(e) => { if (addRequest) addRequest(e) }} />
        <CreateMakeup year={year} semester={semester} isOpen={isOpenMakeup} setIsOpen={setIsOpenMakeup} isLoading={isLoading} onSubmit={(e) => { if (makeupRequest) makeupRequest(e) }} />
        <CreateMakeupTeacher department={department} teacher={teacher} section={section} year={year} semester={semester} isOpen={isOpenMakeupTeacher} setIsOpen={setIsOpenMakeupTeacher} isLoading={isLoading} onSubmit={(e) => { if (makeupRequest && by === "teacher") makeupRequest(e) }} />

        <Card>


            <StyledBody>
                <ListHeading
                    heading={title}
                    endEnhancer={() => (
                        <>
                            {addRequest && <Button size="compact" shape="pill" onClick={() => { setIsOpen(true); }}>
                                Add Class to Schedule
                            </Button>}

                            {makeupRequest && <Button size="compact" shape="pill" onClick={() => { if (by === "teacher") { setIsOpenMakeupTeacher(true); } else { setIsOpenMakeup(true); } }}>
                                Add Makup Class
                            </Button>}
                        </>

                    )}
                    maxLines={1}
                />
                {!isOpen && !isOpenMakeup && !isOpenMakeupTeacher && <Paper>
                    <Scheduler
                        data={schedulerData}
                    >
                        <ViewState

                        />

                        <WeekView
                            excludedDays={[0]}
                            startDayHour={7}
                            endDayHour={19}
                        />

                        <Appointments appointmentComponent={Appointment} />
                        <AppointmentTooltip
                            contentComponent={Content}
                            showCloseButton
                        />

                    </Scheduler>
                </Paper>}
            </StyledBody>
        </Card>
    </>
};