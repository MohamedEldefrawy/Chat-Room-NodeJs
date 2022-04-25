import express from "express";
import {Server} from 'http';
import {Server as Socket} from "socket.io";
import path from 'path';
import {Routes} from "./Routes/Routes.mjs";


const PORT = 3500 || process.env.PORT;
const app = new express();
const server = new Server(app);
const __dirname = path.resolve();
const io = new Socket(server, {});

app.set('view engine', 'ejs');
app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'Public')));

app.use(Routes.getRouter());

server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});