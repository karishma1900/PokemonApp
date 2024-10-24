import React, { useEffect, useState } from 'react';
import Wrapper from '../sections/Wrapper';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getInitialPokemonData } from '../app/reducers/getinitialPokemonData';
import { getPokemonData } from '../app/reducers/getPokemonData';
import PokemonCardGrid from '../components/PokemonCardGrid';
import { debounce } from '../utils/Debounce';
import Loader from '../components/Loader';

function Search() {
  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useAppSelector(({ pokemon }) => pokemon);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    dispatch(getInitialPokemonData()).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon];
      const randomPokemonsId = clonedPokemons.sort(() => Math.random() - Math.random()).slice(0, 20);
      setIsLoading(true); // Set loading before fetching random Pokémon
      dispatch(getPokemonData(randomPokemonsId)).finally(() => setIsLoading(false)); // Ensure loading state is reset
    }
  }, [allPokemon, dispatch]);

  const handleChange = debounce((value: string) => getPokemon(value), 300);
  
  const getPokemon = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) => pokemon.name.includes(value.toLowerCase()));
      setIsLoading(true); // Set loading state when searching
      dispatch(getPokemonData(pokemons!)).finally(() => setIsLoading(false)); // Reset loading state
    } else {
      const clonedPokemons = [...(allPokemon as [])];
      const randomPokemonsId = clonedPokemons.sort(() => Math.random() - Math.random()).slice(0, 20);
      setIsLoading(true); // Set loading before fetching random Pokémon
      dispatch(getPokemonData(randomPokemonsId)).finally(() => setIsLoading(false)); // Reset loading state
    }
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          className='pokemon-searchbar'
          placeholder='Search Pokemon'
          onChange={(e) => handleChange(e.target.value)}
        />
        
        {isLoading ? <Loader /> : <PokemonCardGrid pokemons={randomPokemons!} />}
      </div>
    </>
  );
}

export default Wrapper(Search);
