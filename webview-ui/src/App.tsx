import { useState, useEffect } from 'react';
import './App.css';
import { Settings } from './components/Settings';

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

interface LLMSettings {
  url: string;
  token: string;
  model: string;
}

// Get access to the VS Code API
const vscode = window.acquireVsCodeApi();

function App() {
  const [message, setMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<LLMSettings | null>(null);

  useEffect(() => {
    // Load saved settings from VS Code state
    const savedSettings = vscode.getState<LLMSettings>();
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const handleSettingsSave = (newSettings: LLMSettings) => {
    setSettings(newSettings);
    vscode.setState(newSettings);
    setShowSettings(false);
    // Notify extension about settings update
    vscode.postMessage({
      type: 'settings-updated',
      value: newSettings
    });
  };

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
          <button className="icon-button" title="New Chat">
            <span className="codicon codicon-add"></span>
          </button>
          <button className="icon-button" title="Chat History">
            <span className="codicon codicon-history"></span>
          </button>
          <button className="icon-button" title="Conversations">
            <span className="codicon codicon-list-flat"></span>
          </button>
          <button className="icon-button" title="Documentation">
            <span className="codicon codicon-book"></span>
          </button>
        </div>
        <div className="right-icons">
          <button className="icon-button" title="Share">
            <span className="codicon codicon-link-external"></span>
          </button>
          <button className="icon-button" title="Account">
            <span className="codicon codicon-account"></span>
          </button>
          <button
            className="icon-button"
            title="Settings"
            onClick={() => setShowSettings(true)}
          >
            <span className="codicon codicon-gear"></span>
          </button>
        </div>
      </div>

      <div className="main-content">
        {settings ? (
          <div className="settings-info">
            <p>Server: {settings.url}</p>
            <p>Model: {settings.model}</p>
          </div>
        ) : (
          <div className="no-settings">
            <p>Please configure your LLM settings</p>
            <button onClick={() => setShowSettings(true)}>
              Configure Settings
            </button>
          </div>
        )}

        <div className="input-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
          />
          <button onClick={sendMessage} disabled={!message.trim() || !settings}>
            Send Message
          </button>
        </div>
      </div>

      {showSettings && (
        <Settings
          onSave={handleSettingsSave}
          onClose={() => setShowSettings(false)}
          initialSettings={settings || undefined}
        />
      )}
    </div>
  );
}

export default App;
