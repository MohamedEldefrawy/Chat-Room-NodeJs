export class User {
    _id
    _name
    _room

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get room() {
        return this._room;
    }

    set room(value) {
        this._room = value;
    }
}