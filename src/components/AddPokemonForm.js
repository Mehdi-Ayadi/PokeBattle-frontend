import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonTeamCard from './team/PokemonTeamCard';
import PokemonMove from './pokemon/PokemonMove';
import { Button, Modal, Row, Col, Container } from 'react-bootstrap';
import Scroll from './pokemon/Scroll';


export default function AddPokemonForm(props, move) {
    const history = useHistory();
    const { team_id, team_name, id, species, moves} = props
    const { name, types} = move;
    const [show, setShow] = useState(false);
    const [nickname, setNickname] = useState(species);
    const [attacks, setAttacks] = useState([moves]);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNicknameChange = (event) => {
        setNickname(event.target.value)
    }

    const handlePokemonAttacks = (event) => {
      setAttacks(event.target.value)
        fetch(`${URL}/team_pokemon_moves`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                team_pokemon: {
                    pokemon_id: id
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            history.push('/pokedex')
        })
    }

    const renderMoves = () => {
      return moves.map(move => 
        <Container>
      <PokemonMove handlePokemonAttacks={handlePokemonAttacks} key={move.name} {...move} >
        {name}
      </PokemonMove>
      <h1 className={`moveFont pokemonMove text-capitalize ${types}`} onClick={handleShow}>
          {name}
        </h1>
      </Container>);
    };

    const handleSubmitAddPokemonToTeam = (event) => {
      event.preventDefault();
        fetch('http://localhost:3001/addpokemon', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                team_pokemon: {
                    nickname: nickname,
                    team_id: team_id,
                    pokemon_id: id
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            history.push('/teams')
        })
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add to team
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add {species} to {team_name}?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <PokemonTeamCard shiny={false} pokemon={props} />
              <form onSubmit={handleSubmitAddPokemonToTeam}>
                  <label>
                      Enter a nickname
                      <br/>
                      <input onChange={handleNicknameChange} type="text" name="" placeholder={species} />
                  </label>
                  {/* <Row>
                    <p className="text-center">
                      Attacks
                    </p> 
                  </Row> */}
                  {/* <Container>
                    {/* <Scroll>
                    <Row   className="pl-3 pr-3 pt-2 d-flex flex-wrap justify-content-between">
                      {renderMoves()}
                    </Row> 
                    </Scroll>  */}
                    {/* <hr className="divider"/>
                      <Button variant="secondary">
                        Choose Attacks
                      </Button>
                    </Container> */} 
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Add Pokemon
                    </Button>
                </Modal.Footer>
              </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  AddPokemonForm.defaultProps = {
    moves: []
}