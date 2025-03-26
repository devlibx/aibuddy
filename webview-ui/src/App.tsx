import { useState, useEffect } from 'react';
import './App.css';
import { IconBar } from './components/IconBar';
import { Settings } from './components/Settings';

interface VSCodeAPI {
  postMessage<T extends { type: string }>(message: T): void;
  getState<T>(): T | undefined;
  setState<T>(state: T): void;
}

interface AiBuddySettings {
  url: string;
  token: string;
  model: string;
}

declare global {
  interface Window {
    acquireVsCodeApi(): VSCodeAPI;
  }
}

// Get access to the VS Code API
const vscode = window.acquireVsCodeApi();

type Page = 'main' | 'settings';

function App() {
  const [message, setMessage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [settings, setSettings] = useState<AiBuddySettings | undefined>(undefined);

  useEffect(() => {
    // Listen for messages from the extension
    const messageHandler = (event: MessageEvent) => {
      const message = event.data;
      switch (message.type) {
        case 'loadSettings':
          setSettings(message.value);
          break;
      }
    };

    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      vscode.postMessage({
        type: 'info',
        value: message
      });
      setMessage('');
    }
  };

  const handleSettingsSave = (newSettings: AiBuddySettings) => {
    vscode.postMessage({
      type: 'saveSettings',
      value: newSettings
    });
    setSettings(newSettings);
    setCurrentPage('main');
  };

  return (
    <div className="app-container">
      {currentPage === 'main' ? (
        <>
          <div className="top-bar">
            <div className="left-icons">
              <IconBar
                onAddClick={() => {
                  vscode.postMessage({ type: 'add' });
                }}
                onSettingsClick={() => setCurrentPage('settings')}
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
        </>
      ) : (
        <Settings
          onSave={handleSettingsSave}
          onClose={() => setCurrentPage('main')}
          initialSettings={settings}
        />
      )}
    </div>
  );
}

export default App;
