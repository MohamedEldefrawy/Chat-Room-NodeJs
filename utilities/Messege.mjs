import moment from "moment";

export class Message {

    username;
    text;

    constructor(username, text) {
        this.username = username;
        this.text = text;
    }

    fromMessage() {
        return {
            username: this.username,
            text: this.text,
            time: moment().format("h:mm a")
        }
    }
}