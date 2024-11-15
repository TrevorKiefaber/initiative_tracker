import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Counter(props) {
    const { id, updateScore, score } = props;
    const [value, setValue] = useState(score);
    const submitId = "UpdateScore" + id;

    return (
        <div className="counter">
            <button className="counter-action decrement" onClick={() => changeScore(id, -1)}>-</button>
            <form className="counter-score" onSubmit={ handleSubmit }>
                <input 
                    type="number" 
                    value={ value }
                    onChange={ handleValueChange }
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
            <button className="counter-action increment" onClick={() => changeScore(id, 1)}>+</button>
        </div>
    )

    function handleValueChange(e) {
        if(e.target.value === ""){
            document.getElementById(submitId).style.display="block";
            setValue("");
        }else{
            document.getElementById(submitId).style.display="block";
            setValue(parseInt(e.target.value));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(value !== ""){
            updateScore(id, parseInt(value));
        }else{
            setValue(score);
        }
        document.getElementById(submitId).style.display="none";            
    } 

    function changeScore(id, delta) {
        console.log(value);
        console.log(delta);
        setValue(value + delta);
        props.changeScore(id, delta);
    }
}

Counter.propTypes = {
    id: PropTypes.number.isRequired,
    changeScore: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
    updateScore: PropTypes.func.isRequired
}

export default Counter;