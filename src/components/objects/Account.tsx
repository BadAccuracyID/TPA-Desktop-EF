import {AccountRole} from "./AccountRole";
import {DocumentData} from "@firebase/firestore";
import {AccountShift} from "@/components/objects/AccountShift";

export class Account {
    private readonly uid: string;
    private verified: boolean;
    private name: string;
    private email: string;
    private role: AccountRole;
    private shift: AccountShift;
    private createdAt: Date | null;
    private verifiedBy: string | null;
    private verifiedAt: Date | null;

    constructor(uid: string) {
        this.uid = uid;
        this.verified = false;
        this.name = "";
        this.email = "";
        this.role = AccountRole.Staff;
        this.shift = AccountShift.Unknown;
        this.createdAt = null;
        this.verifiedBy = null;
        this.verifiedAt = null;
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

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getRole(): AccountRole {
        return this.role;
    }

    public setRole(role: AccountRole): void {
        this.role = role;
    }

    public getShift(): AccountShift {
        return this.shift;
    }

    public setShift(shift: AccountShift): void {
        this.shift = shift;
    }

    public getCreatedAt(): Date | null {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date | null): void {
        this.createdAt = createdAt;
    }

    public getVerifiedBy(): string | null {
        return this.verifiedBy;
    }

    public setVerifiedBy(verifiedBy: string | null): void {
        this.verifiedBy = verifiedBy;
    }

    public getVerifiedAt(): Date | null {
        return this.verifiedAt;
    }

    public setVerifiedAt(verifiedAt: Date | null): void {
        this.verifiedAt = verifiedAt;
    }

    static fromDocumentData(data: DocumentData): Account {
        const account = new Account(data['uid']);
        account.setName(data['name']);
        account.setEmail(data['email']);
        account.setVerified(data['verified']);
        account.setRole(data['role']);
        account.setShift(data['shift']);
        account.setCreatedAt(data['createdAt']);
        account.setVerifiedBy(data['verifiedBy']);
        account.setVerifiedAt(data['verifiedAt']);

        return account;
    }

}
