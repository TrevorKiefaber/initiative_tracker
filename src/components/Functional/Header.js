import React from 'react';
import PropTypes from 'prop-types';

let title = "Initative Tracker";

const Header = (props) => {
    return (
        <header>
            <h1>{title}</h1>
            <p>Total Players: {props.totalPlayers}</p>
        </header>
    )
}

Header.propTypes = {
    totalPlayers: PropTypes.number.isRequired
}

export default Header;