import {AccountRole} from "./AccountRole";

export class Account {
    private readonly uid: string;
    private name: string;
    private role: AccountRole;

    constructor(uid: string, name: string, role: AccountRole) {
        this.uid = uid;
        this.name = name;
        this.role = role;
    }

    public getUid(): string {
        return this.uid;
    }

    public getName(): string {
        return this.name;
    }

    public getRole(): AccountRole {
        return this.role;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setRole(role: AccountRole): void {
        this.role = role;
    }
}
