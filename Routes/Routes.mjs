import express from "express";
import {ChatController} from "../Controllers/ChatController.mjs";

export class Routes {


    static getRouter() {
        let router = new express.Router();
        let chatController = new ChatController();
        router.route('/').get(chatController.home);
        router.route('/home').get(chatController.home);
        return router;
    }
}