import React from 'react';
import './IconBar.css';

interface IconBarProps {
    onAddClick?: () => void;
    onSettingsClick?: () => void;
}

export const IconBar: React.FC<IconBarProps> = ({ onAddClick, onSettingsClick }) => {
    return (
        <div className="icon-bar">
            <button
                className="icon-button icon-add"
                onClick={onAddClick}
                title="Add"
            />
            <button
                className="icon-button icon-settings"
                onClick={onSettingsClick}
                title="Settings"
            />
        </div>
    );
};
