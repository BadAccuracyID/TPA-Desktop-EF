import {AccountRole} from "./AccountRole";

export class Account {
    private readonly uid: string;
    private verified: boolean;
    private name: string;
    private role: AccountRole;

    constructor(uid: string) {
        this.uid = uid;
        this.verified = false;
        this.name = "";
        this.role = AccountRole.Staff;
    }

    public getUid(): string {
        return this.uid;
    }

    public setVerified(verified: boolean): void {
        this.verified = verified;
    }

    public isVerified(): boolean {
        return this.verified;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setRole(role: AccountRole): void {
        this.role = role;
    }

    public getRole(): AccountRole {
        return this.role;
    }
}
