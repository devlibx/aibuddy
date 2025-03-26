import { useState } from 'react';
import './App.css';

interface VSCodeAPI {
  postMessage<T extends { type: string }>(message: T): void;
  getState<T>(): T | undefined;
  setState<T>(state: T): void;
}

declare global {
  interface Window {
    acquireVsCodeApi(): VSCodeAPI;
  }
}

// Get access to the VS Code API
const vscode = window.acquireVsCodeApi();

function App() {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      vscode.postMessage({
        type: 'info',
        value: message
      });
      setMessage('');
    }
  };

  return (
    <div className="app-container">
      <h1>AI Buddy</h1>
      <div className="input-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows={4}
        />
        <button onClick={sendMessage} disabled={!message.trim()}>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default App;
