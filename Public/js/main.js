const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chatMessages');

// Read query string
const queryString = Qs.parse(location.search, {
    ignorePunctuation: true,
});

socket.on('message', (message) => {
    insertMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Emitting message to the server
    socket.emit('chatMessage', document.getElementById('msg').value);
    document.getElementById('msg').value = "";
});

// insert Message to DOM
function insertMessage(message) {
    let messageTag = `
       <div class="message">
                <p class="meta">${message.username} <span>${message.time}</span></p>
                <p class="text">
                   ${message.text}
                </p>
            </div>`;
    chatMessages.insertAdjacentHTML('beforeend', messageTag);
}

// join chatroom
socket.emit('join', {username: queryString["?username"], room: queryString["room"]})