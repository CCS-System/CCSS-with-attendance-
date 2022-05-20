export const OR = (arr1, arr2, arr3) => {
    const out = Array(arr1.length).fill(false);
    for (let index = 0; index < out.length; index++) {
        out[index] = arr1[index] || arr2[index] || arr3[index];

    }
    console.log("OR", out)
    return out;
}

export function CheckForRepeat(startIndex, originalArray, valueToCheck) {
    var repeatCount = 1;
    for (var i = startIndex; i < originalArray.length; i++) {
        if (originalArray[i] === valueToCheck) {
            repeatCount++;
        } else {
            return repeatCount;
        }
    }
    return repeatCount;
}

export const slotLookup = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"]

export const findAllPossibleSlots = (duration, avalibility) => {
    const requiredSlots = duration * 2;
    const reservedSlots = [9, 10]
    const allSlots = [];
    for (let i = 0; i < avalibility.length; i++) {
        const numberOfRepeats = CheckForRepeat(i, avalibility, false);
        if (numberOfRepeats >= requiredSlots) {
            const startIndex = i;
            const endIndex = i + requiredSlots - 1
            const slot = [];
            for (let s = startIndex; s <= endIndex; s++) {
                slot.push(s);
            }
            const contains = reservedSlots.some(element => {
                return slot.includes(element);
            });
            if (contains) {
                console.log("SLOT", "contains reserved slot");
            }
            else {
                console.log("SLOT", "found", slot);
                allSlots.push(slot);
            }

        }

    }
    return allSlots;
}



export const findSlots = (duration, avalibility) => {
    const requiredSlots = duration * 2;
    const reservedSlots = [9, 10]
    for (let i = 0; i < avalibility.length; i++) {
        const numberOfRepeats = CheckForRepeat(i, avalibility, false);
        if (numberOfRepeats >= requiredSlots) {
            const startIndex = i;
            const endIndex = i + requiredSlots - 1
            const slot = [];
            for (let s = startIndex; s <= endIndex; s++) {
                slot.push(s);
            }
            const contains = reservedSlots.some(element => {
                return slot.includes(element);
            });
            if (contains) {
                console.log("SLOT", "contains reserved slot");
            }
            else {
                console.log("SLOT", "found", slot);
                return slot;
            }

        }

    }
    console.log("SLOT", "did not find slot");
    return false;
}

export const generateScheduleForSection = (classes, section) => {
    const schedules = [];
    for (const c of classes) {
        console.log("GENERATE", `at class ${c.course} - ${c.type}`);
        const classrooms = c.classrooms;
        LOOP1: for (const classroom of classrooms) {
            console.log("GENERATE", `at classroom ${classroom.id}`);
            for (const weekday of [0, 1, 2, 3, 4, 5]) {
                console.log("GENERATE", `at weekday ${weekday}`);
                const classroomSlot = classroom.slot[weekday]
                const teachers = c.teachers;
                for (const teacher of teachers) {
                    console.log("GENERATE", `at teacher ${teacher.id}`);
                    const teacherSlot = teacher.slot[weekday];
                    const sectionSlot = section.slot[weekday];
                    const avalibility = OR(teacherSlot, classroomSlot, sectionSlot);
                    const slots = findSlots(c.duration, avalibility);
                    if (slots) {
                        console.log("GENERATE", `Found slot`);
                        for (const s of slots) {
                            teacher.slot[weekday][s] = true;
                            classroom.slot[weekday][s] = true;
                            section.slot[weekday][s] = true;
                        }
                        schedules.push({
                            name: `${c.course} [${c.type}]`,
                            section: section.id,
                            label: `${c.year} Semester ${c.semester} Class Schedule for ${section.label}`,
                            year: c.year || "",
                            semester: c.semester || "",
                            teacher: teacher.id,
                            classroom: classroom.id,
                            slots,
                            weekday
                        })
                        console.log("GENERATE", `break out of loop`);
                        break LOOP1;
                    }
                }
            }
        }

    }
    console.log("GENERATE", schedules);
    console.log("GENERATE", "Check length", [classes.length, schedules.length])
    if (classes.length !== schedules.length) {
        console.log("GENERATE", "not complete");
        throw new Error("Could not generate a complete schedule. Make sure there are enough teachers and classrooms for the classes");
    }
    return schedules;
}

export const generateSchedule = (classes, sections) => {
    return new Promise((resolve, reject) => {
        try {
            let schedules = [];
            for (const section of sections) {
                schedules = [...schedules, ...generateScheduleForSection(classes, section)]
            }

            resolve(schedules);
        }
        catch (e) {
            reject(e);
        }
    });
}

export const createSlotMatrix = () => {
    const matrix = [];
    for (let index = 0; index < 6; index++) {
        matrix.push(Array(20).fill(false));

    }
    return matrix;
}