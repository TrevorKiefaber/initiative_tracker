import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import Counter from './Counter';

const Player = (props) => {
    const { id, removePlayer, name, score, changeScore, updateScore, changeName } = props;
    const submitId = "UpdatePlayerName" + id;
    const [value, setValue] = useState(name)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div className="player" ref={setNodeRef} style={style}>
            <div className="drag-handle" {...attributes} {...listeners}></div>
            <form className="player-name" onSubmit={ handleSubmit }>
                <button className="remove-player" onClick={() => removePlayer(id)}>x</button>                    
                <input 
                    type="text"
                    value={ value }
                    onChange={ handleValueChange }
                    placeholder={ name }
                />
                <input
                    type="submit"
                    value="Update"
                    className="SubmitUpdate"
                    id={submitId}
                />
                {/* <input type="text" value={ props.name } onChange={ () => props.handleChangeName(props.id, event) }/> */}
            </form>
            <Counter 
                score={score}
                changeScore={changeScore} 
                id={id}
                updateScore={updateScore}
            />
            <div className="drag-handle" {...attributes} {...listeners}></div>
        </div>
    )

    function handleValueChange(e) {
        document.getElementById(submitId).style.display="inline-block";
        setValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        changeName(id, value);
        document.getElementById(submitId).style.display="none";
    } 
}

Player.propTypes = {
    id: PropTypes.number.isRequired,
    changeScore: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
    updateScore: PropTypes.func.isRequired,
    
    removePlayer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    changeName: PropTypes.func.isRequired
}

export default Player;