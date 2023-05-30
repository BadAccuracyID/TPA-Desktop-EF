import {AccountRole} from "./AccountRole";

export class Account {
    private name: string;
    private role: AccountRole;

    constructor(name: string, role: AccountRole) {
        this.name = name;
        this.role = role;
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
