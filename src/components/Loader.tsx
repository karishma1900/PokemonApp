import React from 'react'
import pokeballLoader from "../assets/pokeball-loader.gif";
function Loader() {
  return (
    <div>
      <div className="loader">
        <img src={pokeballLoader} alt='loader' />
      </div>
    </div>
  )
}

export default Loader
