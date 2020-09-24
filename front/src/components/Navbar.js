import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Sidebar } from './Sidebar';
import './Navbar.css';

function Navbar(props){
    const [sidebar, setSidebar] = useState(false);

    const displaySidebar = () => {
        if(sidebar === false){
            setSidebar(true);
        }
        else if(sidebar === true) {
            setSidebar(false);
        }
    }


    return(
        <>
        <IconContext.Provider value={{'color': '#fff'}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={() => {displaySidebar()}}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={() => {displaySidebar()}}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    { Sidebar.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span style={{marginLeft: "16px"}}>{item.title}</span>
                                </Link>
                            </li> 
                        )
                    })        
                    }
                            <li className="nav-text">
                                <Link to='/logout'>
                                    <AiIcons.AiOutlineLogout />
                                    <span style={{marginLeft: "16px"}}>Déconnexion</span>
                                </Link>
                            </li> 
                    </ul>
                </nav>
        </IconContext.Provider>
        </>
        
    )
}

export default Navbar;