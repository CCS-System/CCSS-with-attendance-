export declare const OR: (arr1: boolean[], arr2: boolean[], arr3: boolean[]) => any[];
export declare function shuffle(array: any[]): any[];
export declare function CheckForRepeat(startIndex: number, originalArray: boolean[], valueToCheck: any): number;
export declare const slotLookup: string[];
export declare const findAllPossibleSlots: (duration: number, avalibility: boolean[]) => any[];
export declare const findSlots: (duration: number, avalibility: boolean[]) => false | any[];
export declare const generateForSection: (classes: Record<any, any>[], section: Record<any, any>, teacherLookup: Record<any, any>, classroomLookup: Record<any, any>[]) => any[];
export declare const runScheduler: (e: Record<any, any>) => Promise<unknown>;
