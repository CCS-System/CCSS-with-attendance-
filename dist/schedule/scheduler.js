"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScheduler = exports.generateForSection = exports.findSlots = exports.findAllPossibleSlots = exports.slotLookup = exports.CheckForRepeat = exports.shuffle = exports.OR = void 0;
const OR = (arr1, arr2, arr3) => {
    const out = Array(arr1.length).fill(false);
    for (let index = 0; index < out.length; index++) {
        out[index] = arr1[index] || arr2[index] || arr3[index];
    }
    return out;
};
exports.OR = OR;
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}
exports.shuffle = shuffle;
function CheckForRepeat(startIndex, originalArray, valueToCheck) {
    var repeatCount = 1;
    for (var i = startIndex; i < originalArray.length; i++) {
        if (originalArray[i] === valueToCheck) {
            repeatCount++;
        }
        else {
            return repeatCount;
        }
    }
    return repeatCount;
}
exports.CheckForRepeat = CheckForRepeat;
exports.slotLookup = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
const findAllPossibleSlots = (duration, avalibility) => {
    const requiredSlots = duration * 2;
    const reservedSlots = [9, 10];
    const allSlots = [];
    for (let i = 0; i < avalibility.length; i++) {
        const numberOfRepeats = CheckForRepeat(i, avalibility, false);
        if (numberOfRepeats >= requiredSlots) {
            const startIndex = i;
            const endIndex = i + requiredSlots - 1;
            const slot = [];
            for (let s = startIndex; s <= endIndex; s++) {
                slot.push(s);
            }
            const contains = reservedSlots.some(element => {
                return slot.includes(element);
            });
            if (contains) {
            }
            else {
                allSlots.push(slot);
            }
        }
    }
    return allSlots;
};
exports.findAllPossibleSlots = findAllPossibleSlots;
const findSlots = (duration, avalibility) => {
    const requiredSlots = duration * 2;
    const reservedSlots = [9, 10];
    for (let i = 0; i < avalibility.length; i++) {
        const numberOfRepeats = CheckForRepeat(i, avalibility, false);
        if (numberOfRepeats >= requiredSlots) {
            const startIndex = i;
            const endIndex = i + requiredSlots - 1;
            const slot = [];
            for (let s = startIndex; s <= endIndex; s++) {
                slot.push(s);
            }
            const contains = reservedSlots.some(element => {
                return slot.includes(element);
            });
            if (contains) {
            }
            else {
                return slot;
            }
        }
    }
    return false;
};
exports.findSlots = findSlots;
const generateForSection = (classes, section, teacherLookup, classroomLookup) => {
    const schedules = [];
    shuffle(classes);
    for (const c of classes) {
        shuffle(c.classrooms);
        const classrooms = c.classrooms;
        LOOP1: for (const classroom of classrooms) {
            for (const weekday of [0, 1, 2, 3, 4, 5]) {
                shuffle(c.teachers);
                const teachers = c.teachers;
                for (const teacher of teachers) {
                    const teacherSlot = teacherLookup[teacher].slot[weekday];
                    const sectionSlot = section.slot[weekday];
                    const classroomSlot = classroomLookup[classroom].slot[weekday];
                    const avalibility = (0, exports.OR)(teacherSlot, classroomSlot, sectionSlot);
                    const slots = (0, exports.findSlots)(c.duration, avalibility);
                    if (slots) {
                        for (const s of slots) {
                            teacherSlot[s] = true;
                            classroomSlot[s] = true;
                            sectionSlot[s] = true;
                        }
                        schedules.push({
                            name: `${c.course} [${c.type}]`,
                            section: section.id,
                            sectionName: section.label,
                            sectionLabel: `${c.year} Semester ${c.semester} Class Schedule for ${section.label}`,
                            label: `${c.year} Semester ${c.semester} Class Schedule for ${section.label}`,
                            year: c.year || "",
                            semester: c.semester || "",
                            teacher: teacherLookup[teacher].id,
                            teacherName: teacherLookup[teacher].label,
                            teacherLabel: `${c.year} Semester ${c.semester} Class Schedule for ${teacherLookup[teacher].label}`,
                            classroom: classroomLookup[classroom].id,
                            classroomName: classroomLookup[classroom].label,
                            classroomLabel: `${c.year} Semester ${c.semester} Class Schedule for ${classroomLookup[classroom].label}`,
                            slots,
                            weekday
                        });
                        break LOOP1;
                    }
                }
            }
        }
    }
    if (classes.length !== schedules.length) {
        throw new Error("Could not generate a complete schedule. Make sure there are enough teachers and classrooms for the classes");
    }
    return schedules;
};
exports.generateForSection = generateForSection;
const runScheduler = (e) => {
    return new Promise((resolve, reject) => {
        try {
            const sections = e.sections;
            const classes = e.classes;
            const classroomLookup = e.classroomLookup;
            const teacherLookup = e.teacherLookup;
            const schedules = [];
            for (const s of sections) {
                const ss = (0, exports.generateForSection)(classes, s, teacherLookup, classroomLookup);
                schedules.push(...ss);
            }
            resolve(schedules);
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.runScheduler = runScheduler;
//# sourceMappingURL=scheduler.js.map