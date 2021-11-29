import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';

const URL = 'http://localhost:3001/'

export default function TeamOfUser(props) {

    const { currentUserId, id } = props;
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(0);
    const history = useHistory();

    useEffect(() => {
        fetch(`${URL}teams`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => setTeams(data))
    }, [])


    const handleShowTeam = (id) => {
        fetch(`${URL}teams/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                battle: {
                    team_index: selectedTeam
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            history.push({
                pathname: '/teams',
                state: {
                    currentUserId: currentUserId,
                }
            });
        })
    };

    // const renderTeamCards = () => {
    //     return selectedTeam.map(selectedTeam => (
    //         <TeamCard 
    //             handleShowTeam={handleShowTeam}
    //             key={currentUserId} 
    //             {...selectedTeam} 
    //         />
    //     ));
    // };

    const handleSelectedTeam = (event) => {
        setSelectedTeam(event.target.value);
    }

    return (
        <Container>  
            <Row>
                {teams.map(selectedTeam => (
                <Container handleSelectedTeam={handleSelectedTeam}>
                 <TeamCard 
                    handleShowTeam={handleShowTeam}
                    key={selectedTeam.id} 
                    {...selectedTeam} 
                 />
                 </Container>
                ))}
            </Row>
        </Container>
    )
}