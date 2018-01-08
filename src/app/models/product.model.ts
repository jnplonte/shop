export class mainModel {
    'id': number;
    'name': string;
    'description': string;
    'image': string;
    'price': number;
    'dateCreated': any;

    constructor(data: { id?: number, name?: string, description?: string, image?: string, price?: number, dateCreated?: any } = {}) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.description = data.description || '';
        this.price = data.price || 0;
        this.dateCreated = data.dateCreated || '';
    }
}
