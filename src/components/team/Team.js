import React, { useState, useEffect } from 'react';
import PokemonTeamCard from './PokemonTeamCard';
import { Container, Row, Col } from 'react-bootstrap';


const URL = 'http://localhost:3001/'

export default function Team(props) {
    const { currentUserId, id } = props;
    const {battleTeamCard, team_pokemons} = props;
    const [teamPokemons, setTeamPokemons] = useState(team_pokemons);

    useEffect(() => {
        setTeamPokemons(team_pokemons)
    }, [team_pokemons])

    const handleSubmitSelectTeam = () => {
        fetch(`${URL}team_pokemons/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setTeamPokemons(data.team.team_pokemons);
        })
    }

    const renderTeamPokemons = () => {
        return teamPokemons.map(teamPokemon => (
            <Col md={4} className="p-1" key={currentUserId}>
                <PokemonTeamCard 
                handleSubmitSelectTeam={handleSubmitSelectTeam}
                {...teamPokemon}
                battleTeamCard={battleTeamCard}
                />
            </Col>
        ));
    };
    return (
    <>
    <Container>
        <Row>
                <Col>
                    <Row>
                      {renderTeamPokemons}
                    </Row>
                </Col>
        </Row>
    </Container>
    </>
    )
}

