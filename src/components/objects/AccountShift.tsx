export enum AccountShift {
    Unknown = "Select Shift",
    Morning = "Morning", // 05.00 - 13.00
    Afternoon = "Afternoon", // 13.00 - 21.00
    Night = "Night", // 21.00 - 05.00
}

export function shiftFromString(shift: string): AccountShift {
    switch (shift) {
        case "Morning":
            return AccountShift.Morning;
        case "Afternoon":
            return AccountShift.Afternoon;
        case "Night":
            return AccountShift.Night;
        default:
            return AccountShift.Unknown;
    }
}

export interface BiTime {
    start: number;
    end: number;
}

export function shiftToBiTime(shift: AccountShift): BiTime {
    switch (shift) {
        case AccountShift.Morning:
            return {start: 5, end: 13};
        case AccountShift.Afternoon:
            return {start: 13, end: 21};
        case AccountShift.Night:
            return {start: 21, end: 5};
        default:
            return {start: 0, end: 0};
    }
}
