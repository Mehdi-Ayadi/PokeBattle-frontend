import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import PokemonTeamCard from './PokemonTeamCard';
import { useHistory } from "react-router-dom";


const URL = 'http://localhost:3001/'

export default function TeamCard(team) {
    const { id, name, matches, wins, losses, battleTeamCard, team_pokemons, handleDeleteTeam } = team;
    const [teamPokemons, setTeamPokemons] = useState(team_pokemons);
    
    const history = useHistory();

    useEffect(() => {
        setTeamPokemons(team_pokemons)
    }, [team_pokemons])

    const getWinRate = () => {
        if (matches) {
            return `${((wins/matches)*100).toFixed(2)}%`
        } else {
            return 'N/A'
        }
    };

    const renderTeamPokemons = () => {
        return teamPokemons.map(teamPokemon => (
            <Col md={4} className="p-1" key={teamPokemon.id}>
                <PokemonTeamCard 
                handleReleasePokemon={handleReleasePokemon}
                {...teamPokemon}
                battleTeamCard={battleTeamCard}
                />
            </Col>
        ));
    };

    const renderAddPokemonButton = () => {
        if (teamPokemons.length < 3) {
            return <Button onClick={handleClickAddPokemonToTeam} variant="outline-primary" className="mr-2">Add Pokémon</Button>
        };
    };

    const handleClickAddPokemonToTeam = (event) => {
        history.push({
            pathname: '/pokedex',
            state: {
                team_id: id,
                team_name: name,
            }
        })
    }

    const handleClickDeleteTeam = (event) => {
        const confirmation = window.confirm('You sure you want to delete this team?');
        if (confirmation) {
            handleDeleteTeam(id);
        }
    };

    const handleReleasePokemon = (id) => {
        fetch(`${URL}team_pokemons/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setTeamPokemons(data.team.team_pokemons);
        })
    }

    return (
        <Container className="mt-3 regCard">
            <Row>
                <Col md={12}>
                    <h1>{name}</h1>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col xs={8}>
                <Badge>Total Matches: {matches}</Badge>
                <Badge>Winrate: {getWinRate()}</Badge>
                <br/>
                <Badge>Wins: {wins}</Badge>
                <Badge>Losses: {losses}</Badge>
                </Col>
                <Col xs={4} className="d-flex flex-row-reverse">
                    {battleTeamCard ? 
                        null
                        :
                        <>
                        <Button
                            onClick={handleClickDeleteTeam}
                            variant="outline-danger">
                            Delete Team
                        </Button>
                        {renderAddPokemonButton()}
                        </>
                    }
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <Row>
                        {teamPokemons.length > 0 ? renderTeamPokemons() : <p className="pl-5">There are no pokémon in this team.</p>}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}