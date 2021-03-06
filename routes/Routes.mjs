import express from "express";
import {ChatController} from "../controllers/ChatController.mjs";

export class Routes {


    static getRouter() {
        let router = new express.Router();
        let chatController = new ChatController();
        router.route('/').get(chatController.home);
        router.route('/home').get(chatController.home);
        router.route('/chat').get(chatController.chat);
        return router;
    }
}