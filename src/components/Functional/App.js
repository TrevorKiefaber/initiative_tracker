import React, { useState } from 'react';
import _ from 'underscore';

import Header from './Header';
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';
import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function App() {
    let [players, setPlayers] = useState([
        {name: "Wirksam", id: 1, score: 1},
        {name: "Binala", id: 2, score: 1},
        {name: "Rhogar", id: 3, score: 1},
        {name: "Kalel", id: 4, score: 1},
        {name: "Tuutuu", id: 5, score: 1},
        {name: "Enfer", id: 6, score: 1},
        {name: "Eku", id: 7, score: 1},
    ]);
    let [prevPlayerId, setPrevPlayerId] = useState(players.length);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div className="scoreboard">
            <Header title="Initiative Tracker" totalPlayers={players.length}></Header>

            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={players}
                    strategy={verticalListSortingStrategy}
                >
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
                                removePlayer={handleRemovePlayer}
                                changeName={handleChangeName}
                                changeScore={handleScoreChange}
                                updateScore={handleUpdateScore}
                            />
                        )
                    })}
                </SortableContext>
            </DndContext>
            <AddPlayerForm
                addPlayer={handleAddPlayer}
                sortCharacters={handleSortCharacters}
            />
        </div>
    )

    function handleScoreChange(id, delta) {
        let ids = players.map(player => player.id);
        let index = _.indexOf(ids, id);
        players[index].score += delta;
        setPlayers(players);
    }

    function handleUpdateScore(id, score) {
        let ids = players.map(player => player.id);
        let index = _.indexOf(ids, id);
        players[index].score = score;
        setPlayers(players);
    }

    function handleAddPlayer(name) {
        setPlayers([
            ...players,
            {
                name,
                score: 1,
                id: prevPlayerId += 1
            }
        ]);
        setPrevPlayerId(prevPlayerId + 1);
    }

    function handleRemovePlayer(id) {
        setPlayers(players.filter(p => p.id !== id))
    }

    function handleChangeName(id, name) {
        let ids = players.map(player => player.id);
        let index = _.indexOf(ids, id);
        let updatedPlayer = _.find(players, (player) => player.id === id);
        updatedPlayer.name = name;
        let updatedPlayers = players;
        updatedPlayers[index] = updatedPlayer;
        setPlayers(updatedPlayers);
    }

    function handleSortCharacters() {
        setPlayers(_.sortBy(players, player => -player.score));
    }

    function handleDragEnd(event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            const idOrder = players.map((play) => play.id);
            const oldIndex = idOrder.indexOf(active.id);
            const newIndex = idOrder.indexOf(over.id);
            const newOrder = arrayMove(players, oldIndex, newIndex);
            setPlayers(newOrder);
        }
    }
}

export default App;
