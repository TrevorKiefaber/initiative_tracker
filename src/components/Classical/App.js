import React, { Component } from 'react';
import _ from 'underscore';

import Header from './Header';
import Player from '../Player';
import AddPlayerForm from './AddPlayerForm';
// import Counter from './Counter';


class App extends Component {

    state = {
        players: [
            {name: "Wirksam", id: 1, score: 1},
            {name: "Binala", id: 2, score: 1},
            {name: "Rhogar", id: 3, score: 1},
            {name: "Kalel", id: 4, score: 1},
            {name: "Tuutuu", id: 5, score: 1},
            {name: "Enfer", id: 6, score: 1},
            {name: "Eku", id: 7, score: 1},
        ]
    }

    // state = {
    //     players: [
    //         {name: "Chadwyc", id: 1, score: 1},
    //         {name: "Kaylin", id: 2, score: 1},
    //         {name: "Callista", id: 3, score: 1},
    //         {name: "Rutrak", id: 4, score: 1}
    //     ]
    // }

    // state = {
    //     players: [
    //         {name: "Omar", id: 1, score: 1},
    //         {name: "Gunthar", id: 2, score: 1},
    //         {name: "Remira", id: 3, score: 1},
    //         {name: "Lucky", id: 4, score: 1}
    //     ]
    // }

    prevPlayerId = this.state.players.length;


    handleScoreChange = (id, delta) => {
        let ids = this.state.players.map(player => player.id);
        let index = _.indexOf(ids, id);
        this.setState( prevState => ({
            score: prevState.players[index].score += delta
        }));
    }

    handleUpdateScore = (id, score) => {
        let ids = this.state.players.map(player => player.id);
        let index = _.indexOf(ids, id);
        this.setState( prevState => ({
            score: prevState.players[index].score = score
        }));
    }

    handleAddPlayer = (name) => {
        this.setState({
            players: [
                ...this.state.players,
                {
                    name,
                    score: 1,
                    id: this.prevPlayerId += 1
                }
            ]
        });
    }

    handleRemovePlayer = (id) => {
        this.setState(prevState => {
            return {
                players: prevState.players.filter( p => p.id !== id)
            }
        })
    }

    handleChangeName = (id, name) => {
        this.setState(prevState => {

            let ids = prevState.players.map(player => player.id);
            let index = _.indexOf(ids, id);
            let updatedPlayer = _.find(prevState.players, (player) => player.id === id);
            updatedPlayer.name = name;
             let players = prevState.players;
            players[index] = updatedPlayer;

            return { players: players };
        })
    }

    handleSortCharacters = () => {
        this.setState(prevState => {
            return { players: _.sortBy(prevState.players, player => -player.score) };
        });
    }

    render() {
        let { players } = this.state;
        // let sortedPlayers = _.sortBy(players, player => -player.score);
        return (
            <div className="scoreboard">
                <Header title="Initiative Tracker" totalPlayers={players.length}></Header>

                {/* {sortedPlayers.map((player) => { */}
                {players.map((player) => {
                    if(player.parent){
                        return null;
                    }
                    return (
                        <Player 
                            name={player.name} 
                            id={player.id}
                            key={player.id.toString()} 
                            score={player.score}
                            removePlayer={this.handleRemovePlayer}
                            changeName={this.handleChangeName}
                            changeScore={this.handleScoreChange}
                            updateScore={this.handleUpdateScore}
                        />
                    )
                })}
                <AddPlayerForm
                    addPlayer={this.handleAddPlayer}
                    sortCharacters={this.handleSortCharacters}
                />
            </div>
        )
    }
};

export default App;
