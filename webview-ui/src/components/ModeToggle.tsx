import React from 'react';
import './ModeToggle.css';

export type Mode = 'PLAN_MODE' | 'ACT_MODE';

interface ModeToggleProps {
    mode: Mode;
    onChange: (mode: Mode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
    return (
        <div className="mode-toggle">
            <button
                className={`mode-button ${mode === 'PLAN_MODE' ? 'active' : ''}`}
                onClick={() => onChange('PLAN_MODE')}
            >
                Plan
            </button>
            <button
                className={`mode-button ${mode === 'ACT_MODE' ? 'active' : ''}`}
                onClick={() => onChange('ACT_MODE')}
            >
                Act
            </button>
        </div>
    );
}
