const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chatMessages');


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
                <p class="meta">Brad <span>9:12pm</span></p>
                <p class="text">
                   ${message}
                </p>
            </div>`;
    chatMessages.insertAdjacentHTML('beforeend', messageTag);
}