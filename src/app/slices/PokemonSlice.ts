import { createSlice } from "@reduxjs/toolkit";
import {  generatedPokemonType, PokemonTypeInitialState , currentPokemonType } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getinitialPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";
import { getUserPokemons } from "../reducers/getUserPokemons";
import { removePokemon } from "../reducers/removePokemonFromUserList";


const initialState:PokemonTypeInitialState = {
    allPokemon: undefined,
    randomPokemons:undefined,
    compareQueue:[],
    userPokemons:[],
    currentPokemon: undefined,

};
export const PokemonSlice = createSlice({
    name:"app",
    initialState,
    reducers:{
        addToCompare: (state, action) =>{
            const index = state.compareQueue.findIndex(
                (pokemon:generatedPokemonType) =>pokemon.id === action.payload.id);

                if(index === -1){
                    if(state.compareQueue.length === 2){
                        state.compareQueue.pop();
                    }
                    state.compareQueue.unshift(action.payload);
                }
        },
        removeFromCompare: (state, action) => {
            const index = state.compareQueue.findIndex(
              (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
            );
            const queue = [...state.compareQueue];
            queue.splice(index, 1);
            state.compareQueue = queue;
          },
          setCurrentPokemon:(state,action) =>{
            state.currentPokemon= action.payload;
          }
    },
    extraReducers:(builder) =>{
        builder.addCase(getInitialPokemonData.fulfilled,(state,action) =>{
            state.allPokemon = action.payload;
        });
        builder.addCase(getPokemonData.fulfilled,(state,action) =>{
            state.randomPokemons = action.payload;
        });
        builder.addCase(getUserPokemons.fulfilled,(state,action) =>{
            state.userPokemons= action.payload!;
        });
        builder.addCase(removePokemon.fulfilled,(state,action) =>{
            const userPokemon = [...state.userPokemons];
            const index = userPokemon.findIndex((pokemon) =>pokemon.firebaseId=== action.payload?.id);

            userPokemon.splice(index,1);
            state.userPokemons = userPokemon;
        })
    },
});
export const {addToCompare, removeFromCompare , setCurrentPokemon} = PokemonSlice.actions;