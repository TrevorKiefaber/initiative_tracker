import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Counter extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        changeScore: PropTypes.func.isRequired,
        score: PropTypes.number.isRequired,
        updateScore: PropTypes.func.isRequired
    }

    state = {
        value: this.props.score
    }

    handleValueChange = (e) => {
        if(e.target.value === ""){
            let submitId = "UpdateScore" + this.props.id;
            document.getElementById(submitId).style.display="block";
            this.setState({ value: "" })
        }else{
            let submitId = "UpdateScore" + this.props.id;
            document.getElementById(submitId).style.display="block";
            this.setState({ value: parseInt(e.target.value) })
        }
    }

    handleSubmit = (e) => {
        let { id, updateScore, score } = this.props;
        e.preventDefault();
        let submitId = "UpdateScore" + id;
        if(this.state.value !== ""){
            updateScore(id, parseInt(this.state.value));
        }else{
            this.setState({value: score});
        }
        document.getElementById(submitId).style.display="none";            
    } 

    changeScore = (id, delta) => {
        this.setState( prevState => ({value: prevState.value + delta}));
        this.props.changeScore(id, delta);
    }

    render() {
        let { id, score } = this.props
        let submitId = "UpdateScore" + id;
        return (
            <div className="counter">
                <button className="counter-action decrement" onClick={() => this.changeScore(id, -1)}>-</button>
                <form className="counter-score" onSubmit={ this.handleSubmit }>
                    <input 
                        type="number" 
                        value={ this.state.value }
                        onChange={ this.handleValueChange }
                        placeholder={ score }
                        className="ScoreValue"
                        min={1}
                        max={99}
                    />
                    <input
                        type="submit"
                        value="Update"
                        className="SubmitScore"
                        id={ submitId }
                    />
                </form>
                {/* <span className="counter-score">{score}</span> */}
                <button className="counter-action increment" onClick={() => this.changeScore(id, 1)}>+</button>
            </div>
        )
    }
}

export default Counter;