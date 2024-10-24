import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getPokemonData } from '../../app/reducers/getPokemonData';
import PokemonCardGrid from '../../components/PokemonCardGrid';
import { genericPokemonType } from '../../utils/Types';
import Loader from '../../components/Loader';

function Evolution() {
 
  const dispatch = useAppDispatch();
  const [ isLoaded , setIsLoaded] = useState(false);
  // const {currentPokemon, randomPokemons} = useAppSelector(({pokemon}) =>pokemon);
  const pokemonData = useAppSelector(({pokemon}) =>pokemon);

  useEffect(() =>{
    const fetchData = async()=>{
    const pokemons:genericPokemonType[] = pokemonData.currentPokemon!.evolution.map(
      ({pokemon}:{pokemon:genericPokemonType}) =>pokemon
    );
    await dispatch(getPokemonData(pokemons));
    setIsLoaded(true);
    };
    fetchData();

  },[dispatch, pokemonData.currentPokemon])


  return (<div className="page">
    {
    isLoaded 

    ?
   ( 
     <PokemonCardGrid pokemons ={pokemonData.randomPokemons!} /> 
    ):(
      <Loader />
    )
      }
      </div>
  )
}

export default Evolution
