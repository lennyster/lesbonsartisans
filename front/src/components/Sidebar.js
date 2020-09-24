import React from 'react';
import * as AiIcons from 'react-icons/ai';


export const Sidebar = [
    {
        title: 'Accueil',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Boutique',
        path: '/shop',
        icon: <AiIcons.AiOutlineShop />,
        cName: 'nav-text'
    },
    {
        title: 'Ajouter un produit',
        path: '/add_product',
        icon: <AiIcons.AiOutlinePlusCircle />,
        cName: 'nav-text'
    },
]