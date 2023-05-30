import {AccountRole} from "./AccountRole";

export class Account {
    private role: AccountRole;

    constructor(role: AccountRole) {
        this.role = role;
    }
}
