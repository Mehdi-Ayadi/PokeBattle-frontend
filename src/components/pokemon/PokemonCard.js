import React from 'react';
import { useLocation } from 'react-router-dom';
import AddPokemonForm from '../AddPokemonForm';
import PokemonTypes from './PokemonTypes';
import useFormatPokemonId from '../../utility/useFormatPokemonId';
import { motion } from 'framer-motion';



export default function PokemonCard(pokemon) {
    const location = useLocation();
    const { team_id, team_name } = location.state;
    const { id, species, types, sprites} = pokemon;

    return (
     <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
        type: "spring",
        stiffness: 150,
        damping: 80
        }}
        whileHover={{ scale: 1, rotate: 30 }}
        whileTap={{
        scale: 0.5,
        rotate: -30,
        borderRadius: "100%"
        }}
     >
        <div className='pokemon regCard'>
        <div className="grow shadow-5">
        <img  src={sprites.front} alt={species}/>
            <small>{useFormatPokemonId(id)}</small>
            <h6 className="text-capitalize">{species}</h6>
            
            <PokemonTypes {...types} />
            <br/>
            <AddPokemonForm team_id={team_id} team_name={team_name} {...pokemon}/>
            </div>
        </div>
        
     </motion.div>
    )
}