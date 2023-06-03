export enum AccountRole {
    Staff = "Staff",
    Doctor = "Doctor",
    Nurse = "Nurse",
    Pharmacist = "Pharmacist",
    Administrator = "Administrator"
}

export function roleFromString(role: string): AccountRole {
    switch (role) {
        case "Staff":
            return AccountRole.Staff;
        case "Doctor":
            return AccountRole.Doctor;
        case "Nurse":
            return AccountRole.Nurse;
        case "Pharmacist":
            return AccountRole.Pharmacist;
        case "Administrator":
            return AccountRole.Administrator;
        default:
            return AccountRole.Staff;
    }
}
