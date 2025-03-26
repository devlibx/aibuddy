import { useState } from 'react';
import './App.css';
import { IconBar } from './components/IconBar';

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
  const [message, setMessage] = useState<string>('');

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
      <div className="top-bar">
        <div className="left-icons">
          <IconBar
            onAddClick={() => {
              vscode.postMessage({ type: 'add' });
            }}
            onSettingsClick={() => {
              vscode.postMessage({ type: 'settings' });
            }}
          />
        </div>
      </div>
      <div className="main-content">
        <div className="input-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
