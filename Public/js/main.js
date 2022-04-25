const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chatMessages');


socket.on('message', (message) => {
    insertMessage(message);
});

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let message = document.getElementById('msg').value;

    message.value = "";
    // Emitting message to the server
    socket.emit('chatMessage', message);
});

// insert Message to DOM
function insertMessage(message) {
    let messageTag = `
       <div class="message">
                <p class="meta">Brad <span>9:12pm</span></p>
                <p class="text">
                   ${message}
                </p>
            </div>`;
    chatMessages.insertAdjacentHTML('beforeend', messageTag);
}