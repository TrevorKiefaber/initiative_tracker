import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AddPlayerForm extends PureComponent {

    static propTypes = {
        addPlayer: PropTypes.func.isRequired,
        sortCharacters: PropTypes.func.isRequired
    }

    state = {
        value: ""
    };

    handleValueChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(e.nativeEvent.submitter.value === "Add Player"){
            this.props.addPlayer(this.state.value);
            this.setState({ value: "" })
        }
        if(e.nativeEvent.submitter.value === "Sort"){
            this.props.sortCharacters();
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="addPlayer">
                <input
                    className="addPlayerText"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleValueChange}
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
    }
}


export default AddPlayerForm;