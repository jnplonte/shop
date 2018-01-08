export class userModel {
    'id': number;
    'firstName': string;
    'lastName': string;
    'email': string;
    'active': boolean;

    constructor(data: { id?: number, firstName?: string, lastName?: string, email?: string, active?: boolean } = {}) {
        this.id = data.id || 0;
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.active = !!data.active;
    }
}
