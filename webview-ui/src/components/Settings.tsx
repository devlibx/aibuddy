import React, { useState } from 'react';

interface SettingsProps {
    onSave: (settings: { url: string; token: string; model: string }) => void;
    onClose: () => void;
    initialSettings?: { url: string; token: string; model: string };
}

export function Settings({ onSave, onClose, initialSettings }: SettingsProps) {
    const [url, setUrl] = useState(initialSettings?.url || '');
    const [token, setToken] = useState(initialSettings?.token || '');
    const [model, setModel] = useState(initialSettings?.model || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ url, token, model });
    };

    return (
        <div className="settings-modal">
            <div className="settings-content">
                <h2>Settings</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="url">LLM Server URL:</label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            placeholder="https://api.example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="token">API Token:</label>
                        <input
                            type="password"
                            id="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                            placeholder="Enter your API token"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Model Name:</label>
                        <input
                            type="text"
                            id="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            required
                            placeholder="e.g., gpt-4"
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
