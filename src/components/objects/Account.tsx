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

    public isVerified(): boolean {
        return this.verified;
    }

    public setVerified(verified: boolean): void {
        this.verified = verified;
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
