// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import axios from 'axios';
import { pokemonRoute, pokemonSpeciesRoute, pokemonTabs } from '../utils/Contants';
import { defaultImages, images } from '../utils/getPokemonImages';
import { extractColors } from 'extract-colors';
import Wrapper from '../sections/Wrapper';
import Description from './pokemonsPages/Description';
import Evolution from './pokemonsPages/Evolution';
import Location from './pokemonsPages/Location';
import CapableMoves from './pokemonsPages/CapableMoves';
import { setPokemonTab } from '../app/slices/AppSlice';
import { setCurrentPokemon } from '../app/slices/PokemonSlice';
import Loader from "../components/Loader";

function Pokemon() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const currentPokemonTab = useAppSelector(({ app: { currentPokemonTab } }) => currentPokemonTab);
  const currentPokemon = useAppSelector(({ pokemon: { currentPokemon } }) => currentPokemon);

  useEffect(() => {
    dispatch(setPokemonTab(pokemonTabs.description));
  }, [dispatch]);

  const getRecrusiveEvolution = useCallback((evolutionChain, level, evolutionData) => {
    if (!evolutionChain.evolves_to.length) {
      return evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
      });
    }
    evolutionData.push({
      pokemon: {
        ...evolutionChain.species,
        url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
      },
      level,
    });
    return getRecrusiveEvolution(evolutionChain.evolves_to[0], level + 1, evolutionData);
  }, []);

  const getEvolutionData = useCallback((evolutionChain) => {
    const evolutionData = [];
    getRecrusiveEvolution(evolutionChain, 1, evolutionData);
    return evolutionData;
  }, [getRecrusiveEvolution]);

  const [isDataLoading, setIsDataLoading] = useState(true);
  const getPokemonInfo = useCallback(async (image) => {
    const { data } = await axios.get(`${pokemonRoute}/${params.id}`);
    const { data: dataEncounters } = await axios.get(data.location_area_encounters);
    const { data: { evolution_chain: { url: evolutionURL } } } = await axios.get(`${pokemonSpeciesRoute}/${data.id}`);
    const { data: evolutionData } = await axios.get(evolutionURL);
    
    const encounters = [];
    dataEncounters.forEach((encounter) => {
      encounters.push(
        encounter.location_area.name.toUpperCase().split("-").join(" ")
      );
    });

    const pokemonAbilities = {
      abilities: data.abilities.map(({ ability }) => ability.name),
      moves: data.moves.map(({ move }) => move.name),
    };

    const evolution = getEvolutionData(evolutionData.chain);
    
    // Check if the Pokémon has an evolution level
    const evolutionLevelObj = evolution.find(({ pokemon }) => pokemon.name === data.name);
    const evolutionLevel = evolutionLevelObj ? evolutionLevelObj.level : null; // Set to null if not found

    dispatch(setCurrentPokemon({
      id: data.id,
      name: data.name,
      types: data.types.map(({ type }) => type.name),
      image,
      stats: data.stats.map(({ stat, base_stat }) => ({
        name: stat.name,
        value: base_stat,
      })),
      encounters,
      evolutionLevel, // This could be null
      evolution,
      pokemonAbilities,
    }));

    setIsDataLoading(false);
  }, [getEvolutionData, params.id, dispatch]);

  useEffect(() => {
    const imageElement = document.createElement("img");
    // @ts-ignore
    imageElement.src = images[params.id];
    if (!imageElement.src) {
      // @ts-ignore
      imageElement.src = defaultImages[params.id];
    }

    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    };

    const getColor = async () => {
      const color = await extractColors(imageElement.src, options);
      const root = document.documentElement;
      root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };
    
    getColor();
    getPokemonInfo(imageElement.src);
  }, [params, getPokemonInfo]);

  return <>
    {!isDataLoading && currentPokemon ? (
      <>
        {currentPokemonTab === pokemonTabs.description && <Description />}
        {currentPokemonTab === pokemonTabs.evolution && <Evolution />}
        {currentPokemonTab === pokemonTabs.locations && <Location />}
        {currentPokemonTab === pokemonTabs.moves && <CapableMoves />}
      </>
    ) : (
      <Loader />
    )}
  </>;
}

export default Wrapper(Pokemon);
