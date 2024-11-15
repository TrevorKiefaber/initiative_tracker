import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddPlayerForm(props) {
    const {addPlayer, sortCharacters} = props;
    const [name, setName] = useState("");

    return (
        <form onSubmit={handleSubmit} className="addPlayer">
            <input
                className="addPlayerText"
                type="text"
                value={name}
                onChange={handleValueChange}
                placeholder="Enter a players's name"
            />

            <input 
                className="addPlayerSubmit"
                type="submit"
                value="Add Player"
            />

            <input
                className="sortCharactersSubmit"
                type="submit"
                value="Sort"
            />
        </form>
    );

    function handleValueChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(e.nativeEvent.submitter.value === "Add Player"){
            addPlayer(name);
            setName("");
        }
        if(e.nativeEvent.submitter.value === "Sort"){
            sortCharacters();
        }
    }
}

AddPlayerForm.propTypes = {
    addPlayer: PropTypes.func.isRequired,
    sortCharacters: PropTypes.func.isRequired
}


export default AddPlayerForm;