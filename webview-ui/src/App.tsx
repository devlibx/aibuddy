import { useState, useEffect } from 'react';
import './App.css';
import { IconBar } from './components/IconBar';
import { Settings } from './components/Settings';
import { ModeToggle, Mode } from './components/ModeToggle';

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

interface AppState {
  mode: Mode;
  settings?: AiBuddySettings;
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
  const [mode, setMode] = useState<Mode>('PLAN_MODE');

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

    // Load saved mode
    const savedState = vscode.getState() as AppState | undefined;
    if (savedState?.mode) {
      setMode(savedState.mode);
    }

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

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    const currentState = vscode.getState() as AppState | undefined;
    vscode.setState({ ...currentState, mode: newMode });
    vscode.postMessage({
      type: 'modeChange',
      value: newMode
    });
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
            <div className="spacer"></div>
            <div className="right-icons">
              <IconBar
                onAddClick={() => {
                  vscode.postMessage({ type: 'add' });
                }}
                onSettingsClick={() => setCurrentPage('settings')}
              />
            </div>
          </div>
          <div className="main-content">
            <div className="spacer"></div>
            <div className="input-container">
              <div className="textarea-container">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                />
                <button
                  className="send-button"
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  title="Send message"
                >
                  ✈
                </button>
              </div>
              <div className="bottom-controls">
                <ModeToggle mode={mode} onChange={handleModeChange} />
              </div>
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
