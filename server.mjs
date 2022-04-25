import express from "express";
import path from 'path';
import {Server} from 'http';
import {Server as Socket} from "socket.io";
import {Routes} from "./routes/Routes.mjs";
import {Message} from "./utilities/Messege.mjs";
import {User} from "./model/User.mjs";


const PORT = 3500 || process.env.PORT;
const app = new express();
const server = new Server(app);
const __dirname = path.resolve();
const io = new Socket(server, {});
let users = [];

app.set('view engine', 'ejs');
app.use(express.json());

app.use(express.static(path.join(__dirname, 'Public')));

app.use(Routes.getRouter());


server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

//Run When client connect
io.on('connection', socket => {

    // run when client connect
    socket.on('join', (data) => {
        let newUser = new User();
        newUser.name = data.username;
        newUser.room = data.room;
        newUser.id = socket.id;

        users.push(newUser);

        socket.join(newUser.room);

        // Welcome current user
        socket.emit('message', new Message("ChatJutsu", `Welcome ${newUser.name}  to ChatJutsu`).fromMessage());

        // Broadcast when a user connects
        socket.broadcast.to(newUser.room).emit('message', new Message("ChatJutsu", `${newUser.name} connected`).fromMessage());

    });

    // Listen for chat message
    socket.on('chatMessage', (message) => {
        let currentUser = users.find(user => {
            if (user.id === socket.id)
                return user;
        });
        io.to(currentUser.room).emit('message', new Message(currentUser.name, message).fromMessage());
    });

    // Broadcast when a user disconnect
    socket.on('disconnect', () => {
        let currentUser = users.find(user => {
            if (user.id === socket.id)
                return user;
        });
        let currentUserIndex = users.findIndex(user => user.id === currentUser.id);

        io.to(currentUser.room).emit('message', new Message("ChatJutsu", `${currentUser.name} has been left`).fromMessage());
        users.splice(currentUserIndex, 1);
    });
})