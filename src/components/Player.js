import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Counter from './Counter';

class Player extends PureComponent {
    
    static propTypes = {
        id: PropTypes.number.isRequired,
        changeScore: PropTypes.func.isRequired,
        score: PropTypes.number.isRequired,
        updateScore: PropTypes.func.isRequired,
    
        removePlayer: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        changeName: PropTypes.func.isRequired
    }

    state = {
        value: this.props.name
    }

    handleValueChange = (e) => {
        let submitId = "UpdatePlayerName" + this.props.id;
        document.getElementById(submitId).style.display="inline-block";
        this.setState({ value: e.target.value })
    }

    handleSubmit = (e) => {
        let { changeName, id } = this.props;
        e.preventDefault();
        let submitId = "UpdatePlayerName" + id;
        changeName(id, this.state.value);
        document.getElementById(submitId).style.display="none";
    } 

    render(){
        const { id, removePlayer, name, score, changeScore, updateScore } = this.props;
        let submitId = "UpdatePlayerName" + id;
        return (
            <div className="player">
                <form className="player-name" onSubmit={this.handleSubmit}>
                    <button className="remove-player" onClick={() => removePlayer(id)}>x</button>                    
                    <input 
                        type="text"
                        value={ this.state.value }
                        onChange={this.handleValueChange}
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
            </div>
        )
    }
}


export default Player;