import React from 'react'
import Wrapper from '../sections/Wrapper';
import avatarImage from '../assets/karishma.jpeg';
import { FaGithub, FaLink, FaLinkedin, FaYoutube } from 'react-icons/fa';

function About() {

  return <div className="profile">
    <img src={avatarImage} alt=' avatar ' className='profile-image' />
    <h1 className="profile-text">Hi I am Karishma Khatri</h1>
    <h2 className="profile-text">The creator of this pokemon website</h2>
    <h4 className="profile-text">This Project is created for my portfolio.
    This project allowed me to apply various technologies and design principles while creating an engaging user experience. Through this website, I aim to demonstrate my ability to develop visually appealing interfaces and robust functionalities. I hope you enjoy exploring the site as much as I enjoyed building it!
    </h4>
    <div className="profile-links">
      <a href="https://github.com/KNkarishma2000" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
      <a href="https://www.linkedin.com/in/karishma-khatri1?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bt7qPUTb7TrynibdXpzeBaQ%3D%3D " target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      <a href="https://www.youtube.com/@karishmaclasses" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
      <a href="https://drive.google.com/drive/folders/1CFz_QHrU_W-bC7Nb-06eKGEZx0ND1qhz?usp=drive_link" target="_blank" rel="noopener noreferrer"><FaLink /></a>
    </div>
  </div>
}

export default Wrapper(About);
