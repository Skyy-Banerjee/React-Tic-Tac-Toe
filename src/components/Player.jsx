import React, { useState } from 'react';

function Player({ initialName, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditClick() {
        if (!isEditing) {
            setIsEditing(true);
        } else {
            onChangeName(symbol, playerName); // Call onChangeName when saving
            setIsEditing(false);
        }
    }

    function handleChange(evt) {
        setPlayerName(evt.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {!isEditing && editablePlayerName}
                {isEditing && <input type="text" value={playerName} onChange={handleChange} />}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{!isEditing ? 'Edit' : 'Save'}</button>
        </li>
    );
}

export default Player;
