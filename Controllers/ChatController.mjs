
export class ChatController {
    home(request, response) {
        response.render('index');
    }

    chat(request, response) {
        response.render('chat');
    }
}