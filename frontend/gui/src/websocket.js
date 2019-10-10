class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  // Connect to the websocket
  connect() {
    const path = 'ws://127.0.0.1:8000/ws/chat/test/';
    this.socketRef = new WebSocket(path);

    // On Open
    this.socketRef.onopen = () => {
      console.log('WebSocket open...');
    };
    this.socketNewMessage(JSON.stringify({
      command: 'fetch_messages'
    }));

    // On Message
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };

    // On Error
    this.socketRef.onerror = e => {
      console.log(e.message);
    };

    // On Close
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen...");
      this.connect();
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    // Handle list of messages
    if (command === 'messages') {
      this.callbacks[command](parsedData.messages);
    }
    // Handle one message
    if (command === 'new_message') {
      this.callbacks[command](parsedData.message);
    }
  }

  fetchMessages(username) {
    this.sendMessage({ command: 'fetch_messages', username: username });
  }

  newChatMessage(message) {
    this.sendMessage({ command: 'new_message', from: message.from, message: message.content });
  }

  // Adding callbacks in the dictionary
  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks['messages'] = messagesCallback;
    this.callbacks['new_message'] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance; 