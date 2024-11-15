import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AddPlayerForm extends PureComponent {

    static propTypes = {
        addPlayer: PropTypes.func.isRequired
    }

    state = {
        value: ""
    };

    handleValueChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addPlayer(this.state.value);
        this.setState({ value: "" })
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
            </form>
        );
    }
}


export default AddPlayerForm;