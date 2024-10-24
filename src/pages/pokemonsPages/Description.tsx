import React from 'react'
import { useAppSelector } from '../../app/hooks';
import PokemonContainer from '../../components/PokemonContainer';
import Info from '../../components/Info';

function Description() {
  const pokemonData = useAppSelector(({pokemon:{currentPokemon}}) =>currentPokemon);
  return (
    <>
    <div className="grid-column">

   
      
        <Info data={pokemonData} />
        {pokemonData && <PokemonContainer image={pokemonData.image} />}
      
      {/* <PokemonContainer  image={pokemonData?.image!}/> */}
      </div>
    </>
  )
    
  
}

export default Description
