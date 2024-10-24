import React, { useEffect, useState } from 'react'
import pokeballIcon from "../assets/pokeball-icon.png"
import {GiHamburgerMenu} from "react-icons/gi"
import { Link, useLocation } from 'react-router-dom';
function Navbar() {
const location = useLocation();
const [menuOpen, setMenuOpen] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigationRoutes = [
    {
      name:"Search",
      route: "/search",
    },
    {
      name:"Compare",
      route:"/compare",

    },
    {
      name:"Pokemon",
      route:"/pokemon",

    },
    {
      name: "My List",
      route:"/list",
    },
    {
      name:"About",
      route:"/about",
    },
  ];

  useEffect(() =>{
    const index = navigationRoutes.findIndex(({route}) =>
      location.pathname.includes(route)
    
  );ul(index);
  },[location.pathname,navigationRoutes]);
  function ul(index:number){
    const underlines = document.querySelectorAll<HTMLElement>(".underline")
    for(let i=0; i<underlines.length; i++){
      underlines[i].style.transform = "translate3d("+ index*100+"%,0,0)";
    }
  }
  return <nav>
    <div className="block">
      <img src={pokeballIcon} alt='pokeball icon' />
    </div>
    <div className="data">
      <div className={`menu ${menuOpen ? 'open' : ''} `}>
      <ul>
        <div className="underline"></div>
        <div className="underline"></div>
        <div className="underline"></div>
        {
          navigationRoutes.map(({name,route},index) =>{
            return <Link to={route} key={index}>
              <li>
                {name}
              </li>
            </Link>
          })
        }
      </ul>
    </div>
    </div>
    <div className="block" onClick={() =>setMenuOpen(prev => !prev)}>
      <GiHamburgerMenu />
    </div>
  </nav>
  
  
}

export default Navbar
